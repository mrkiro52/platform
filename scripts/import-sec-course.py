#!/usr/bin/env python3
"""Импорт курса по кибербезопасности (HTML-версия course-site/site) в программу зимнего лагеря.

Что делает:
  * читает главы курса (Подготовка, Linux, Сети, Windows, Веб) и их страницы;
  * каждую тему превращает в главу платформы: конспект в формате блоков ProgramBlocks
    (абзацы, списки, код, таблицы, картинки, раскрывающийся «Разбор / ответ»);
  * вопросы «Вопрос №N», «Самопроверка», «Что зафиксировать» собирает в задание главы:
    тесты с одним верным вариантом — тест с автопроверкой, остальное — ответы на проверку;
  * картинки складывает в public/winter/sec/ (webp, не шире 1600px);
  * пишет src/data/winter/sec/<глава>/<ref>.js и src/data/winter/sec/index.js.

Запуск из корня репозитория:
  python3 -I scripts/import-sec-course.py <папка course-site/site> [<папка с картинками курса>]

Папка с картинками — «курс (2)/images» из исходного архива курса: страницы ссылаются на неё.
Если её нет, такие картинки пропускаются (список — в src/data/winter/sec/missing-images.txt);
картинки, встроенные прямо в страницы, переносятся всегда. Скрипт можно запускать повторно:
ref глав берутся из имён страниц и не меняются — по ним лежат сданные работы.
"""
import base64
import hashlib
import html
import io
import json
import os
import re
import sys
from html.parser import HTMLParser

try:
    from PIL import Image
except ImportError:  # без Pillow картинки копируются как есть
    Image = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DATA = os.path.join(ROOT, 'src', 'data', 'winter', 'sec')
OUT_IMG = os.path.join(ROOT, 'public', 'winter', 'sec')
IMG_URL = '/winter/sec/'
MAX_W = 1600

# Главы курса → блоки программы. key — ключ блока на платформе (менять нельзя: по нему лежат работы)
MODULES = [
    {'key': 'sec-linux', 'pages': ['prep.html', 'linux.html'], 'prefix': {'prep.html': 'prep', 'linux.html': 'linux'}},
    {'key': 'sec-net', 'pages': ['networks.html'], 'prefix': {'networks.html': 'networks'}},
    {'key': 'sec-win', 'pages': ['windows.html'], 'prefix': {'windows.html': 'windows'}},
    {'key': 'sec-webapp', 'pages': ['web.html'], 'prefix': {'web.html': 'web'}},
]

VOID = {'br', 'img', 'hr', 'input', 'meta', 'link', 'source', 'wbr'}


# ── Простое DOM-дерево на html.parser ───────────────────────────────────────

class Node:
    __slots__ = ('tag', 'attrs', 'children', 'parent')

    def __init__(self, tag, attrs=None, parent=None):
        self.tag, self.attrs, self.children, self.parent = tag, dict(attrs or {}), [], parent

    def find_all(self, pred):
        out = []
        for c in self.children:
            if isinstance(c, Node):
                if pred(c):
                    out.append(c)
                out.extend(c.find_all(pred))
        return out

    def find(self, pred):
        r = self.find_all(pred)
        return r[0] if r else None

    def text(self):
        return ''.join(c if isinstance(c, str) else c.text() for c in self.children)


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('#root')
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def parse(path):
    b = TreeBuilder()
    b.feed(open(path, encoding='utf-8').read())
    return b.root


def cls(n, name):
    return name in (n.attrs.get('class') or '').split()


# ── Картинки ────────────────────────────────────────────────────────────────

class Images:
    def __init__(self, src_dir):
        self.src_dir = src_dir
        self.missing = set()
        self.saved = 0
        os.makedirs(OUT_IMG, exist_ok=True)

    def _write(self, raw, name):
        out = os.path.join(OUT_IMG, name)
        if not os.path.exists(out):
            if Image:
                im = Image.open(io.BytesIO(raw))
                im = im.convert('RGBA') if im.mode in ('P', 'LA', 'RGBA') else im.convert('RGB')
                if im.width > MAX_W:
                    im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
                im.save(out, 'WEBP', quality=80, method=6)
            else:
                open(out, 'wb').write(raw)
            self.saved += 1
        return IMG_URL + name

    def url(self, src):
        if src.startswith('data:image/'):
            raw = base64.b64decode(src.split(',', 1)[1])
            return self._write(raw, hashlib.sha1(raw).hexdigest()[:16] + '.webp')
        m = re.search(r'images/([^/?#]+)$', html.unescape(src).replace('%20', ' '))
        if not m:
            return None
        base = m.group(1)
        path = os.path.join(self.src_dir, base) if self.src_dir else None
        if not path or not os.path.exists(path):
            self.missing.add(base)
            return None
        name = os.path.splitext(base)[0] + '.webp'
        return self._write(open(path, 'rb').read(), name)


# ── Текст с разметкой платформы: **жирный**, _курсив_, `код`, [ссылка](url) ──

def squash(s):
    return re.sub(r'[ \t\r\f\v]*\n[ \t\r\f\v]*', '\n', re.sub(r'[ \t\r\f\v]+', ' ', s))


def wrap_mark(raw, mark, ok):
    # Пробелы по краям выносим за маркеры: «<b>значение </b>LAB_ID» → «**значение** LAB_ID»
    inner = raw.strip()
    if not inner:
        return raw
    lead = raw[:len(raw) - len(raw.lstrip())]
    tail = raw[len(raw.rstrip()):]
    return lead + (f'{mark}{inner}{mark}' if ok(inner) else inner) + tail


def inline(n, images=None, imgs_out=None):
    out = []
    for c in n.children:
        if isinstance(c, str):
            out.append(c.replace('\n', ' '))
            continue
        t = c.tag
        if t == 'br':
            out.append('\n')
        elif t in ('strong', 'b'):
            out.append(wrap_mark(inline(c, images, imgs_out), '**', lambda x: '**' not in x))
        elif t in ('em', 'i'):
            out.append(wrap_mark(inline(c, images, imgs_out), '_', lambda x: '_' not in x and '\n' not in x))
        elif t == 'code':
            inner = c.text().replace('\n', ' ')
            out.append(f'`{inner}`' if inner.strip() and '`' not in inner else inner)
        elif t == 'a':
            label = inline(c, images, imgs_out).strip()
            href = c.attrs.get('href', '')
            if re.match(r'^https?://\S+$', href) and label and ']' not in label and '[' not in label:
                out.append(f'[{label.replace("**", "")}]({href})')
            else:
                out.append(label)
        elif t == 'img':
            if imgs_out is not None and images:
                u = images.url(c.attrs.get('src', ''))
                if u:
                    imgs_out.append({'t': 'img', 'src': u, 'alt': c.attrs.get('alt') or ''})
        elif t in ('script', 'style', 'svg'):
            continue
        else:
            out.append(inline(c, images, imgs_out))
    return ''.join(out)


def clean(s):
    s = squash(s)
    s = re.sub(r'\*\*\s*\*\*', '', s)
    return s.strip()


# ── Блоки урока ─────────────────────────────────────────────────────────────

HEAD = {'h1': 1, 'h2': 2, 'h3': 3, 'h4': 4, 'h5': 5, 'h6': 6}
ANSWER_RE = re.compile(r'^\**\s*(Разбор\s*/\s*ответ|Разбор|Ответ)\s*:?\s*\**\s*:?\s*$', re.I)
# «Вопрос №3», «Вопрос 3», просто «Вопрос» (одна задача в конце практики) и «Проверка выполнения» (чекер стенда)
QUESTION_RE = re.compile(r'^\**\s*(?:Вопрос(?:\s*№\s*(\d+)|\s+(\d+))?|Проверка выполнения)\s*\**\s*[:.]?\s*$', re.I)


def question_no(m, fallback):
    return int(m.group(1) or m.group(2) or fallback)


def list_items(n, images, extra):
    items = []
    for li in [c for c in n.children if isinstance(c, Node) and c.tag == 'li']:
        parts, nested = [], []
        for c in li.children:
            if isinstance(c, Node) and c.tag in ('ul', 'ol'):
                for i, sub in enumerate(list_items(c, images, extra), 1):
                    nested.append(f'{i}. {sub}' if c.tag == 'ol' else f'— {sub}')
            elif isinstance(c, Node) and c.tag in ('pre',):
                nested.append(f'`{c.text().strip()}`')
            elif isinstance(c, Node):
                wrap = Node('#', {}, None)
                wrap.children = [c]
                parts.append(inline(wrap, images, extra))
            else:
                parts.append(c.replace('\n', ' '))
        text = clean(' '.join(p for p in parts))
        if nested:
            text = (text + '\n' if text else '') + '\n'.join(nested)
        if text:
            items.append(text)
    return items


def table_block(n):
    rows = []
    for tr in n.find_all(lambda x: x.tag == 'tr'):
        cells = [c for c in tr.children if isinstance(c, Node) and c.tag in ('td', 'th')]
        rows.append((all(c.tag == 'th' for c in cells), [clean(inline(c)) for c in cells]))
    if not rows:
        return None
    headers = rows[0][1] if rows[0][0] else []
    body = [r for _, r in (rows[1:] if headers else rows)]
    width = max([len(headers)] + [len(r) for r in body]) if (headers or body) else 0
    if not headers:
        headers = [''] * width
    body = [r + [''] * (width - len(r)) for r in body]
    return {'t': 'table', 'headers': [re.sub(r'\*\*|`', '', h) for h in headers + [''] * (width - len(headers))], 'rows': body}


def blocks_of(children, images):
    """Плоский список блоков; заголовки — {'t': 'H', 'level', 'text'} (раскладываются позже)."""
    out = []
    for c in children:
        if isinstance(c, str):
            if c.strip():
                out.append({'t': 'p', 'text': clean(c)})
            continue
        t = c.tag
        if t in HEAD:
            text = clean(inline(c))
            if text:
                out.append({'t': 'H', 'level': HEAD[t], 'text': re.sub(r'^\*\*(.*)\*\*$', r'\1', text)})
        elif t == 'p':
            imgs = []
            text = clean(inline(c, images, imgs))
            if text:
                out.append({'t': 'p', 'text': text})
            out.extend(imgs)
        elif t in ('ul', 'ol'):
            imgs = []
            items = list_items(c, images, imgs)
            if items:
                b = {'t': t, 'items': items}
                if t == 'ol' and c.attrs.get('start', '').isdigit():
                    b['start'] = int(c.attrs['start'])
                out.append(b)
            out.extend(imgs)
        elif t == 'pre':
            code = c.text().rstrip('\n')
            if code.strip():
                out.append({'t': 'code', 'text': code})
        elif t == 'blockquote':
            inner = blocks_of(c.children, images)
            paras = [b['text'] for b in inner if b['t'] == 'p']
            lists = ['\n'.join('— ' + i for i in b['items']) for b in inner if b['t'] in ('ul', 'ol')]
            text = '\n'.join(paras + lists)
            if text:
                out.append({'t': 'note', 'text': text})
            out.extend(b for b in inner if b['t'] in ('img', 'code', 'table'))
        elif t == 'table':
            b = table_block(c)
            if b:
                out.append(b)
        elif t == 'img':
            u = images.url(c.attrs.get('src', ''))
            if u:
                out.append({'t': 'img', 'src': u, 'alt': c.attrs.get('alt') or ''})
        elif t in ('hr', 'script', 'style', 'form', 'nav', 'aside'):
            continue
        else:
            out.extend(blocks_of(c.children, images))
    return out


def page_article(path):
    root = parse(path)
    art = root.find(lambda n: n.tag == 'article' and cls(n, 'prose'))
    h1 = root.find(lambda n: n.tag == 'h1')
    head = root.find(lambda n: n.tag == 'header' and cls(n, 'page-heading'))
    sub = head.find(lambda n: n.tag == 'p') if head else None
    checks = root.find_all(lambda n: n.tag == 'form' and cls(n, 'check-form'))
    keys = {}
    for f in checks:
        if f.attrs.get('data-mode') == 'choice' and f.attrs.get('data-expected'):
            m = re.search(r'-q(\d+)$', f.attrs.get('data-check', ''))
            if m:
                keys[int(m.group(1))] = f.attrs['data-expected']
    child = root.find(lambda n: n.tag == 'section' and cls(n, 'child-topics'))
    children = []
    if child:
        for a in child.find_all(lambda n: n.tag == 'a' and n.attrs.get('href', '').endswith('.html')):
            children.append(a.attrs['href'])
    return {
        'title': clean(h1.text()) if h1 else os.path.basename(path),
        'sub': clean(sub.text()) if sub else '',
        'article': art,
        'keys': keys,
        'children': children,
    }


def overview(path):
    """Главная страница главы курса: части и темы в них."""
    root = parse(path)
    parts = []
    for sec in root.find_all(lambda n: n.tag == 'section' and cls(n, 'lesson-group')):
        h2 = sec.find(lambda n: n.tag == 'h2')
        items = []
        for a in sec.find_all(lambda n: n.tag == 'a' and cls(n, 'topic-row')):
            items.append(a.attrs['href'])
        parts.append({'title': clean(h2.text()) if h2 else '', 'items': items})
    h1 = root.find(lambda n: n.tag == 'h1')
    page_title = clean(h1.text()) if h1 else 'Подготовка'
    if not parts:  # «Подготовка»: темы без частей
        items = [a.attrs['href'] for a in root.find_all(lambda n: n.tag == 'a' and n.attrs.get('href', '').startswith('prep-topic-'))]
        parts.append({'title': page_title, 'items': list(dict.fromkeys(items))})
    # Части без заголовка — это темы самой главы: собираем их в одну группу с именем главы
    merged = []
    for part in parts:
        part['title'] = part['title'] or page_title
        if merged and merged[-1]['title'] == part['title']:
            merged[-1]['items'] += part['items']
        else:
            merged.append(part)
    return merged


# ── Разбор вопросов и разделов ──────────────────────────────────────────────

def is_case(title):
    # после «Case» идёт «_2.1» — \b там не срабатывает, поэтому граница задана явно
    return bool(re.match(r'^(Guided Case|Self-study Case|Кейс|Тест)(?![A-Za-zА-Яа-яЁё])', title, re.I))


def split_sections(flat, fallback_title):
    """Режем по самому крупному уровню заголовков; мельче — подзаголовки h3/h4 внутри раздела."""
    levels = sorted({b['level'] for b in flat if b['t'] == 'H'})
    top = levels[0] if levels else None
    sections, cur = [], None

    def open_section(title):
        nonlocal cur
        cur = {'id': f's{len(sections) + 1}', 'title': title, 'blocks': []}
        sections.append(cur)

    for b in flat:
        if b['t'] == 'H' and b['level'] == top:
            open_section(b['text'])
            continue
        if cur is None:
            open_section(fallback_title)
        if b['t'] == 'H':
            cur['blocks'].append({'t': 'h3' if b['level'] <= top + 1 else 'h4', 'text': b['text']})
        else:
            cur['blocks'].append(b)
    return [s for s in sections if s['blocks'] or s['title']]


def fold_answers(sections):
    """«Разбор / ответ:» и всё до следующего подзаголовка — в раскрывающийся блок.
    Заодно собираем тексты вопросов «Вопрос №N» для задания."""
    questions = []
    for s in sections:
        qm = QUESTION_RE.match(s['title'])
        blocks, out, i = s['blocks'], [], 0
        qtext = []
        collecting = bool(qm)
        while i < len(blocks):
            b = blocks[i]
            if b['t'] == 'p' and ANSWER_RE.match(b['text']):
                j = i + 1
                inner = []
                while j < len(blocks) and blocks[j]['t'] not in ('h3', 'h4'):
                    inner.append(blocks[j])
                    j += 1
                if inner:
                    out.append({'t': 'reveal', 'title': 'Разбор и ответ', 'blocks': inner})
                collecting = False
                i = j
                continue
            if collecting:
                if b['t'] == 'p':
                    qtext.append(b['text'])
                elif b['t'] in ('ul', 'ol'):
                    qtext.append('\n'.join(('— ' if b['t'] == 'ul' else f'{k}. ') + it for k, it in enumerate(b['items'], 1)))
                elif b['t'] == 'code':
                    qtext.append('`' + b['text'].replace('\n', ' ') + '`' if '`' not in b['text'] and len(b['text']) < 300 else b['text'])
                elif b['t'] in ('h3', 'h4'):
                    collecting = False
            out.append(b)
            i += 1
        s['blocks'] = out
        if qm and qtext:
            questions.append({'n': question_no(qm, len(questions) + 1), 'title': s['title'], 'text': '\n'.join(qtext).strip()})
    return questions


def defensive_questions(sections):
    """Защитные практики и дополнения: «Что зафиксировать», «Самопроверка», «Контрольный вопрос»."""
    qs = []
    for s in sections:
        for b in s['blocks']:
            if b['t'] != 'p':
                continue
            m = re.match(r'^\*\*(Что зафиксировать|Самопроверка|Контрольный вопрос)\.?\*\*\.?\s*(.+)$', b['text'], re.S)
            if m:
                qs.append({'title': m.group(1), 'text': m.group(2).strip()})
            m2 = re.match(r'^(Контрольный вопрос)\.\s*(.+)$', b['text'], re.S)
            if m2 and not m:
                qs.append({'title': m2.group(1), 'text': m2.group(2).strip()})
    return qs


def choice_test(sections, keys):
    """Тест с вариантами «[1] …». Если у всех вопросов ровно один верный вариант — автопроверка."""
    qs = []
    for s in sections:
        qm = QUESTION_RE.match(s['title'])
        if not qm:
            continue
        n = question_no(qm, len(qs) + 1)
        text = ' '.join(b['text'] for b in s['blocks'] if b['t'] == 'p')
        opts = []
        for b in s['blocks']:
            if b['t'] in ('ul', 'ol'):
                for it in b['items']:
                    om = re.match(r'^\[(\d+)\]\s*(.+)$', it, re.S)
                    if om:
                        opts.append((int(om.group(1)), om.group(2).strip()))
        if not opts:
            return None
        qs.append({'n': n, 'text': text, 'options': opts, 'key': keys.get(n)})
    if not qs:
        return None
    single = all(q['key'] and re.fullmatch(r'\d+', q['key']) for q in qs)
    return {'single': single, 'questions': qs}


# ── Сборка ──────────────────────────────────────────────────────────────────

def js_module(lesson, task):
    body = 'export default ' + json.dumps(lesson, ensure_ascii=False, indent=1) + '\n'
    if task is not None:
        body += '\nexport const task = ' + json.dumps(task, ensure_ascii=False, indent=1) + '\n'
    return '// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.\n' + body


def build_chapter(site, pages, title, sub, images):
    """pages — страницы, из которых собирается глава (тема + её теоретические подтемы)."""
    all_sections, questions, defensive, test = [], [], [], None
    infos = [(p, page_article(os.path.join(site, p))) for p in pages]
    infos = [(p, i) for p, i in infos if i['article'] is not None]
    # Подтемы складываем разделами, только если текст есть больше чем на одной странице
    many = len(infos) > 1
    for p, info in infos:
        flat = blocks_of(info['article'].children, images)
        secs = split_sections(flat, info['title'] if many else 'Главное')
        t = choice_test(secs, info['keys'])
        if t:
            test = t
            continue
        if many and info['title'] != title:
            # Подтема — отдельным разделом; её заголовки уходят на уровень ниже
            merged = {'id': '', 'title': info['title'], 'blocks': []}
            for s in secs:
                if s['title'] and s['title'] != info['title'] and s['title'] != 'Главное':
                    merged['blocks'].append({'t': 'h3', 'text': s['title']})
                merged['blocks'].extend(b if b['t'] != 'h3' else {'t': 'h4', 'text': b['text']} for b in s['blocks'])
            secs = [merged]
        questions += fold_answers(secs)
        defensive += defensive_questions(secs)
        all_sections += secs
    for i, s in enumerate(all_sections, 1):
        s['id'] = f's{i}'

    task = None
    if test and test['single']:
        task = {'kind': 'auto', 'title': title, 'questions': [{
            'q': q['text'],
            'options': [o for _, o in q['options']],
            'correct': [k for k, _ in q['options']].index(int(q['key'])),
            'explanation': '',
        } for q in test['questions']]}
    elif test:
        task = {'kind': 'quiz', 'intro': 'Тест по теме. На каждый вопрос напиши номер верного варианта — или несколько номеров через запятую, если верных несколько. Проверяющий посмотрит ответы и даст обратную связь.', 'questions': [{
            'id': f'q{q["n"]}', 'topic': f'Вопрос №{q["n"]}',
            'text': q['text'] + '\n' + '\n'.join(f'[{k}] {o}' for k, o in q['options']),
        } for q in test['questions']]}
    elif questions:
        task = {'kind': 'quiz', 'intro': 'Ответь на вопросы практики так, как получилось у тебя на стенде: значения, команды и короткое пояснение, как к ним пришёл. Разбор в тексте главы открывай после того, как попробуешь сам. Проверяющий посмотрит ответы и даст обратную связь.', 'questions': [{
            'id': f'q{q["n"]}', 'topic': q['title'], 'text': q['text'],
        } for q in questions]}
    elif defensive:
        task = {'kind': 'quiz', 'intro': 'Выполни практику в учебной среде и запиши результат: что проверил, как и что получилось. Проверяющий посмотрит ответы и даст обратную связь.', 'questions': [{
            'id': f'q{i}', 'topic': q['title'], 'text': q['text'],
        } for i, q in enumerate(defensive, 1)]}

    lesson = {'title': title, 'intro': sub or None, 'sections': all_sections}
    return lesson, task


def collect_children(site, href, seen):
    """Тема и все её подтемы (рекурсивно), в порядке оглавления."""
    out = [href]
    seen.add(href)
    info = page_article(os.path.join(site, href))
    for c in info['children']:
        if c not in seen and os.path.exists(os.path.join(site, c)):
            out += collect_children(site, c, seen)
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    site = os.path.abspath(sys.argv[1])
    img_dir = os.path.abspath(sys.argv[2]) if len(sys.argv) > 2 else None
    images = Images(img_dir)
    os.makedirs(OUT_DATA, exist_ok=True)

    index = []
    for mod in MODULES:
        groups, chapters = [], []
        level = 0
        for page in mod['pages']:
            for part in overview(os.path.join(site, page)):
                level += 1
                groups.append({'title': part['title'], 'level': level})
                for href in part['items']:
                    seen = set()
                    pages = collect_children(site, href, seen)
                    head = page_article(os.path.join(site, href))
                    # Практики (Guided Case, кейсы, тесты) — отдельными главами, теория — разделами темы
                    theory = [p for p in pages if p == href or not is_case(page_article(os.path.join(site, p))['title'])]
                    cases = [p for p in pages if p not in theory]
                    units = [(href, theory, head['title'], head['sub'])] if (head['article'] is not None or len(theory) > 1) else []
                    units += [(p, [p], page_article(os.path.join(site, p))['title'], page_article(os.path.join(site, p))['sub']) for p in cases]
                    for ref_page, src_pages, title, sub in units:
                        lesson, task = build_chapter(site, src_pages, title, sub, images)
                        if not lesson['sections'] and not task:
                            continue
                        ref = re.sub(r'\.html$', '', ref_page)
                        rel = f'{mod["key"]}/{ref}.js'
                        os.makedirs(os.path.join(OUT_DATA, mod['key']), exist_ok=True)
                        open(os.path.join(OUT_DATA, rel), 'w', encoding='utf-8').write(js_module(lesson, task))
                        chapters.append({
                            'ref': ref, 'title': title, 'level': level, 'file': rel,
                            'sections': len(lesson['sections']),
                            'kind': task['kind'] if task else ('self' if is_case(title) else None),
                            'count': len(task['questions']) if task else 0,
                            'practice': is_case(title),
                            'taskOnly': not lesson['sections'],
                        })
        index.append({'key': mod['key'], 'groups': groups, 'chapters': chapters})

    lines = [
        '// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.',
        '// Главы блоков направления «Информационная безопасность» зимнего лагеря.',
        '// ref глав не меняются при повторном импорте: по ключу «<блок>:<ref>» лежат сданные работы.',
        '',
        'export const SEC_COURSE = {',
    ]
    for m in index:
        lines.append(f'  {json.dumps(m["key"])}: {{')
        lines.append(f'    groups: {json.dumps(m["groups"], ensure_ascii=False)},')
        lines.append('    chapters: [')
        for c in m['chapters']:
            meta = {k: c[k] for k in ('ref', 'title', 'level', 'sections', 'kind', 'count', 'practice', 'taskOnly')}
            lines.append(f'      {{ ...{json.dumps(meta, ensure_ascii=False)}, load: () => import({json.dumps("./" + c["file"])}) }},')
        lines.append('    ],')
        lines.append('  },')
    lines.append('}')
    open(os.path.join(OUT_DATA, 'index.js'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    missing_path = os.path.join(OUT_DATA, 'missing-images.txt')
    if images.missing:
        open(missing_path, 'w').write('\n'.join(sorted(images.missing)) + '\n')
    elif os.path.exists(missing_path):
        os.remove(missing_path)

    for m in index:
        kinds = {}
        for c in m['chapters']:
            kinds[c['kind']] = kinds.get(c['kind'], 0) + 1
        print(f'{m["key"]}: {len(m["chapters"])} глав, задания: {kinds}')
    print(f'картинок сохранено: {images.saved}, не найдено: {len(images.missing)}')


if __name__ == '__main__':
    main()
