// Блок ноября «Углубляемся», направление «Машинное обучение», глава 4 — Нейросети для NLP.
// Последовательности и типы задач, эмбеддинги слов, RNN и BPTT, двунаправленные сети, затухание и взрыв
// градиента, LSTM и GRU, seq2seq, декодирование, механизм внимания, токенизация и аугментации текстов.
// Вывод примеров и график градиентов — настоящие расчёты (PyTorch), схемы — SVG.
// Задание к главе пока не опубликовано.

export default {
 "num": 4,
 "title": "Нейросети для NLP",
 "summary": "Тексты как последовательности и типы задач; one-hot и эмбеддинги слов: word2vec, GloVe, fastText; рекуррентные сети и обратное распространение во времени; двунаправленные и многослойные RNN; затухание и взрыв градиента, gradient clipping; LSTM и GRU; seq2seq, teacher forcing, жадный и лучевой поиск, сэмплирование с температурой; механизм внимания и self-attention; предобработка, BPE-токенизация, паддинг и аугментации текстов.",
 "intro": "Тексты — последовательности переменной длины, где важен порядок. В этой главе разберём, как превратить слова в векторы, как рекуррентные сети читают текст слово за словом и почему им трудно помнить далёкий контекст, как LSTM и GRU решают эту проблему, как устроены переводчики на архитектуре энкодер-декодер и как механизм внимания подготовил появление трансформеров. Примеры кода выполнены по-настоящему, а схемы показывают устройство каждой архитектуры.",
 "sections": [
  {
   "id": "sequences",
   "num": "4.1",
   "title": "Тексты и последовательности",
   "blocks": [
    {
     "t": "p",
     "text": "В главах 2 и 3 вход сети имел фиксированный размер: вектор признаков или картинка. Тексты устроены иначе: это **последовательности** переменной длины, где важен порядок — «собака укусила почтальона» и «почтальон укусил собаку» состоят почти из одних и тех же слов. К последовательностям относятся и речь, и временные ряды, и последовательности действий пользователя, и ДНК."
    },
    {
     "t": "p",
     "text": "Текст сначала разбивают на **токены** — слова, части слов или символы (раздел 4.9), а каждому токену из **словаря** присваивают номер. Модель получает последовательность номеров и должна выдать ответ, форма которого зависит от задачи."
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 660 250\" role=\"img\" aria-label=\"Типы задач с последовательностями: многие к одному, многие ко многим синхронно, последовательность в последовательность, один ко многим\"><rect x=\"36.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"36.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"60.5\" y1=\"104\" x2=\"64.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"69.5,104.0 64.0,106.4 64.0,101.6\" fill=\"#FF8C42\"/><rect x=\"36.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"36.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"48.5\" y1=\"150\" x2=\"48.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"48.5,117.0 50.9,122.5 46.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"70.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"70.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"94.5\" y1=\"104\" x2=\"98.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"103.5,104.0 98.0,106.4 98.0,101.6\" fill=\"#FF8C42\"/><rect x=\"70.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"70.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"82.5\" y1=\"150\" x2=\"82.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"82.5,117.0 84.9,122.5 80.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"104.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"104.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><rect x=\"104.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"104.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"116.5\" y1=\"150\" x2=\"116.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"116.5,117.0 118.9,122.5 114.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"104.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"104.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"116.5\" y1=\"92\" x2=\"116.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"116.5,59.0 118.9,64.5 114.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"82.5\" y=\"204\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">многие к одному</text><text x=\"82.5\" y=\"224\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">классификация текста</text><rect x=\"201.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"201.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"225.5\" y1=\"104\" x2=\"229.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"234.5,104.0 229.0,106.4 229.0,101.6\" fill=\"#FF8C42\"/><rect x=\"201.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"201.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"213.5\" y1=\"150\" x2=\"213.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"213.5,117.0 215.9,122.5 211.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"201.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"201.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"213.5\" y1=\"92\" x2=\"213.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"213.5,59.0 215.9,64.5 211.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"235.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"235.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"259.5\" y1=\"104\" x2=\"263.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"268.5,104.0 263.0,106.4 263.0,101.6\" fill=\"#FF8C42\"/><rect x=\"235.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"235.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"247.5\" y1=\"150\" x2=\"247.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"247.5,117.0 249.9,122.5 245.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"235.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"235.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"247.5\" y1=\"92\" x2=\"247.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"247.5,59.0 249.9,64.5 245.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"269.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"269.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><rect x=\"269.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"269.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"281.5\" y1=\"150\" x2=\"281.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"281.5,117.0 283.9,122.5 279.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"269.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"269.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"281.5\" y1=\"92\" x2=\"281.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"281.5,59.0 283.9,64.5 279.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"247.5\" y=\"204\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">многие ко многим</text><text x=\"247.5\" y=\"224\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">разметка каждого слова</text><rect x=\"349.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"349.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"373.5\" y1=\"104\" x2=\"377.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"382.5,104.0 377.0,106.4 377.0,101.6\" fill=\"#FF8C42\"/><rect x=\"349.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"349.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"361.5\" y1=\"150\" x2=\"361.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"361.5,117.0 363.9,122.5 359.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"383.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"383.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"407.5\" y1=\"104\" x2=\"411.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"416.5,104.0 411.0,106.4 411.0,101.6\" fill=\"#FF8C42\"/><rect x=\"383.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"383.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"395.5\" y1=\"150\" x2=\"395.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"395.5,117.0 397.9,122.5 393.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"417.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"417.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"441.5\" y1=\"104\" x2=\"445.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"450.5,104.0 445.0,106.4 445.0,101.6\" fill=\"#FF8C42\"/><rect x=\"417.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"417.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"429.5\" y1=\"92\" x2=\"429.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"429.5,59.0 431.9,64.5 427.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"451.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"451.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><rect x=\"451.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"451.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"463.5\" y1=\"92\" x2=\"463.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"463.5,59.0 465.9,64.5 461.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"412.5\" y=\"204\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">seq2seq</text><text x=\"412.5\" y=\"224\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">перевод, суммаризация</text><rect x=\"531.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"531.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"555.5\" y1=\"104\" x2=\"559.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"564.5,104.0 559.0,106.4 559.0,101.6\" fill=\"#FF8C42\"/><rect x=\"531.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"531.5\" y=\"150\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><line x1=\"543.5\" y1=\"150\" x2=\"543.5\" y2=\"122.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"543.5,117.0 545.9,122.5 541.1,122.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"531.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"531.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"543.5\" y1=\"92\" x2=\"543.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"543.5,59.0 545.9,64.5 541.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"565.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"565.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><line x1=\"589.5\" y1=\"104\" x2=\"593.1\" y2=\"104\" stroke=\"#FF8C42\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><polygon points=\"598.5,104.0 593.0,106.4 593.0,101.6\" fill=\"#FF8C42\"/><rect x=\"565.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"565.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"577.5\" y1=\"92\" x2=\"577.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"577.5,59.0 579.9,64.5 575.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"599.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"599.5\" y=\"92\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><rect x=\"599.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" class=\"dg-bg\"/><rect x=\"599.5\" y=\"34\" width=\"24\" height=\"24\" rx=\"5\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><line x1=\"611.5\" y1=\"92\" x2=\"611.5\" y2=\"64.4\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"611.5,59.0 613.9,64.5 609.1,64.5\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"577.5\" y=\"204\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">один ко многим</text><text x=\"577.5\" y=\"224\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">подпись к картинке</text><line x1=\"165\" y1=\"30\" x2=\"165\" y2=\"180\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\" stroke-opacity=\"0.25\" stroke-linecap=\"round\"/><line x1=\"330\" y1=\"30\" x2=\"330\" y2=\"180\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\" stroke-opacity=\"0.25\" stroke-linecap=\"round\"/><line x1=\"495\" y1=\"30\" x2=\"495\" y2=\"180\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\" stroke-opacity=\"0.25\" stroke-linecap=\"round\"/></svg>",
     "caption": "Синие — входы, оранжевые — шаги рекуррентной сети, зелёные — выходы",
     "width": 660
    },
    {
     "t": "table",
     "caption": "Таблица 1. Типы задач",
     "headers": [
      "Тип",
      "Пример",
      "Вход → выход"
     ],
     "rows": [
      [
       "многие к одному",
       "тональность отзыва, спам-фильтр, тематика",
       "текст → класс"
      ],
      [
       "многие ко многим синхронно",
       "части речи, именованные сущности (NER)",
       "метка для каждого токена"
      ],
      [
       "seq2seq (асинхронно)",
       "перевод, суммаризация, ответы на вопросы",
       "текст → текст другой длины"
      ],
      [
       "один ко многим",
       "подпись к картинке, генерация музыки по жанру",
       "вектор → последовательность"
      ]
     ]
    }
   ],
   "terms": [
    [
     "токен",
     "единица текста для модели: слово, часть слова или символ."
    ],
    [
     "словарь",
     "множество токенов, известных модели; у каждого свой номер."
    ]
   ]
  },
  {
   "id": "embeddings",
   "num": "4.2",
   "title": "Векторные представления слов",
   "blocks": [
    {
     "t": "h3",
     "text": "4.2.1. One-hot и его проблемы"
    },
    {
     "t": "p",
     "text": "Самый простой способ превратить токен в вектор — **one-hot**: вектор длины словаря (десятки тысяч), где у нужного слова стоит 1, а остальные нули. Недостатки очевидны: векторы огромные и разреженные, а главное — **все слова одинаково далеки друг от друга**: «кот» так же не похож на «кошку», как на «экскаватор»."
    },
    {
     "t": "h3",
     "text": "4.2.2. Дистрибутивная гипотеза"
    },
    {
     "t": "p",
     "text": "Идея, на которой построены все эмбеддинги слов: **слова, встречающиеся в похожих контекстах, имеют похожий смысл**. «Утром я пью ___ с молоком» — сюда подходят «кофе» и «чай», и именно поэтому их векторы должны быть близки. **Эмбеддинг** — плотный вектор размерности 100–1000, который модель учит так, чтобы похожие по смыслу слова оказались рядом."
    },
    {
     "t": "h3",
     "text": "4.2.3. word2vec"
    },
    {
     "t": "p",
     "text": "**word2vec** (2013) обучает эмбеддинги на огромном корпусе текстов как побочный продукт простой задачи. Два варианта:"
    },
    {
     "t": "ul",
     "items": [
      "**Skip-gram**: по слову предсказать слова вокруг него в окне ±k. Хорошо работает для редких слов.",
      "**CBOW** (continuous bag of words): по словам окна предсказать центральное слово. Быстрее учится."
     ]
    },
    {
     "t": "p",
     "text": "Честный softmax по всему словарю на каждом шаге слишком дорог, поэтому используют **negative sampling**: модель учится отличать настоящие пары «слово — контекст» от случайных. Для пары \\((w, c)\\) и \\(k\\) случайных «отрицательных» слов \\(n_i\\):"
    },
    {
     "t": "tex",
     "rows": [
      [
       "потери",
       "L = -\\log \\sigma(u_c^\\top v_w) - \\sum_{i=1}^{k} \\log \\sigma(-u_{n_i}^\\top v_w)"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Обученные векторы обладают знаменитым свойством: смысловые отношения превращаются в направления в пространстве. Вектор «король» − «мужчина» + «женщина» оказывается ближе всего к «королева», а «Москва» − «Россия» + «Франция» — к «Париж». Близость векторов измеряют **косинусным сходством**."
    },
    {
     "t": "table",
     "caption": "Таблица 2. Классические эмбеддинги слов",
     "headers": [
      "Метод",
      "Идея",
      "Особенность"
     ],
     "rows": [
      [
       "word2vec",
       "предсказание контекста по слову или слова по контексту",
       "быстрый, простой, стал стандартом"
      ],
      [
       "GloVe",
       "факторизация матрицы совместной встречаемости слов",
       "учитывает глобальную статистику корпуса"
      ],
      [
       "fastText",
       "слово = сумма эмбеддингов его символьных n-грамм",
       "есть вектор и для незнакомого слова; хорош для русского с его падежами и окончаниями"
      ]
     ]
    },
    {
     "t": "note",
     "text": "Главное ограничение этих методов — **один вектор на слово** независимо от контекста: у «лука» (овощ) и «лука» (оружие) один эмбеддинг. Контекстные эмбеддинги, где вектор слова зависит от предложения, дают рекуррентные сети и особенно трансформеры (глава 5)."
    },
    {
     "t": "h3",
     "text": "4.2.4. Слой эмбеддингов"
    },
    {
     "t": "p",
     "text": "В нейросети эмбеддинги хранятся в матрице \\(E\\) размера «словарь × размерность», и слой `nn.Embedding` просто выбирает строки по номерам токенов. Это то же самое, что умножить one-hot вектор на \\(E\\), но без огромного разреженного умножения. Матрицу можно инициализировать готовыми word2vec-векторами или учить с нуля вместе с остальной сетью."
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\n\nvocab = {'<pad>': 0, 'я': 1, 'люблю': 2, 'машинное': 3, 'обучение': 4}\nemb = nn.Embedding(num_embeddings=len(vocab), embedding_dim=3, padding_idx=0)\nids = torch.tensor([[1, 2, 3, 4], [1, 2, 4, 0]])     # батч из 2 фраз, вторая дополнена <pad>\nprint('форма входа:', tuple(ids.shape), '→ форма выхода:', tuple(emb(ids).shape))\n\nonehot = nn.functional.one_hot(ids, len(vocab)).float()\nprint('lookup = one-hot × E:', torch.allclose(emb(ids), onehot @ emb.weight))\nprint('вектор <pad> нулевой:', emb(ids)[1, 3].tolist())",
     "out": "форма входа: (2, 4) → форма выхода: (2, 4, 3)\nlookup = one-hot × E: True\nвектор <pad> нулевой: [0.0, 0.0, 0.0]"
    }
   ],
   "terms": [
    [
     "эмбеддинг",
     "плотный обучаемый вектор, представляющий токен."
    ],
    [
     "word2vec",
     "метод обучения эмбеддингов по контексту слов."
    ],
    [
     "negative sampling",
     "замена softmax по словарю на различение настоящих и случайных пар."
    ],
    [
     "косинусное сходство",
     "косинус угла между векторами; мера их близости."
    ]
   ]
  },
  {
   "id": "rnn",
   "num": "4.3",
   "title": "Рекуррентные нейронные сети",
   "blocks": [
    {
     "t": "p",
     "text": "**Рекуррентная сеть** (RNN) читает последовательность по одному элементу и хранит **скрытое состояние** \\(h_t\\) — «память» о прочитанном. На каждом шаге новое состояние вычисляется из текущего входа и прошлого состояния **одними и теми же весами**:"
    },
    {
     "t": "tex",
     "rows": [
      [
       "состояние",
       "h_t = \\tanh(W x_t + U h_{t-1} + b)"
      ],
      [
       "выход",
       "y_t = V h_t + c"
      ]
     ]
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 640 250\" role=\"img\" aria-label=\"Рекуррентная сеть, развёрнутая во времени: на каждом шаге одна и та же ячейка получает вход и прошлое скрытое состояние\"><rect x=\"40\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"40\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"75\" y=\"122\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">RNN</text><path d=\"M110 112 C150 112 150 66 75 66 C40 66 40 84 60 98\" fill=\"none\" stroke=\"#FF8C42\" stroke-width=\"1.5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><polygon points=\"62,100 52,95 60,89\" fill=\"#FF8C42\"/><text x=\"118\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-style=\"italic\">h</text><rect x=\"52\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"52\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"75\" y=\"201\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">x<tspan font-size=\"9.4\" baseline-shift=\"sub\">t</tspan></text><line x1=\"75\" y1=\"186\" x2=\"75\" y2=\"151.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"75.0,145.0 77.9,151.4 72.1,151.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"52\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"52\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"75\" y=\"39\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">y<tspan font-size=\"9.4\" baseline-shift=\"sub\">t</tspan></text><line x1=\"75\" y1=\"100\" x2=\"75\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"75.0,55.0 77.9,61.4 72.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"185\" y=\"122\" font-size=\"22\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">=</text><rect x=\"240\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"240\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"275\" y=\"122\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">h<tspan font-size=\"10.1\" baseline-shift=\"sub\">1</tspan></text><rect x=\"252\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"252\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"275\" y=\"201\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">x<tspan font-size=\"9.4\" baseline-shift=\"sub\">1</tspan></text><line x1=\"275\" y1=\"186\" x2=\"275\" y2=\"151.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"275.0,145.0 277.9,151.4 272.1,151.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"252\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"252\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"275\" y=\"39\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">y<tspan font-size=\"9.4\" baseline-shift=\"sub\">1</tspan></text><line x1=\"275\" y1=\"100\" x2=\"275\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"275.0,55.0 277.9,61.4 272.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"310\" y1=\"122\" x2=\"332.7\" y2=\"122\" stroke=\"#FF8C42\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"339.0,122.0 332.6,124.9 332.6,119.1\" fill=\"#FF8C42\"/><rect x=\"340\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"340\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"375\" y=\"122\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">h<tspan font-size=\"10.1\" baseline-shift=\"sub\">2</tspan></text><rect x=\"352\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"352\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"375\" y=\"201\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">x<tspan font-size=\"9.4\" baseline-shift=\"sub\">2</tspan></text><line x1=\"375\" y1=\"186\" x2=\"375\" y2=\"151.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"375.0,145.0 377.9,151.4 372.1,151.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"352\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"352\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"375\" y=\"39\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">y<tspan font-size=\"9.4\" baseline-shift=\"sub\">2</tspan></text><line x1=\"375\" y1=\"100\" x2=\"375\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"375.0,55.0 377.9,61.4 372.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"410\" y1=\"122\" x2=\"432.7\" y2=\"122\" stroke=\"#FF8C42\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"439.0,122.0 432.6,124.9 432.6,119.1\" fill=\"#FF8C42\"/><rect x=\"440\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"440\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"475\" y=\"122\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">h<tspan font-size=\"10.1\" baseline-shift=\"sub\">3</tspan></text><rect x=\"452\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"452\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"475\" y=\"201\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">x<tspan font-size=\"9.4\" baseline-shift=\"sub\">3</tspan></text><line x1=\"475\" y1=\"186\" x2=\"475\" y2=\"151.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"475.0,145.0 477.9,151.4 472.1,151.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"452\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"452\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"475\" y=\"39\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">y<tspan font-size=\"9.4\" baseline-shift=\"sub\">3</tspan></text><line x1=\"475\" y1=\"100\" x2=\"475\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"475.0,55.0 477.9,61.4 472.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"510\" y1=\"122\" x2=\"532.7\" y2=\"122\" stroke=\"#FF8C42\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"539.0,122.0 532.6,124.9 532.6,119.1\" fill=\"#FF8C42\"/><rect x=\"540\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"540\" y=\"100\" width=\"70\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"575\" y=\"122\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">h<tspan font-size=\"10.1\" baseline-shift=\"sub\">4</tspan></text><rect x=\"552\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"552\" y=\"186\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"575\" y=\"201\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">x<tspan font-size=\"9.4\" baseline-shift=\"sub\">4</tspan></text><line x1=\"575\" y1=\"186\" x2=\"575\" y2=\"151.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"575.0,145.0 577.9,151.4 572.1,151.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"552\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"552\" y=\"24\" width=\"46\" height=\"30\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"575\" y=\"39\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">y<tspan font-size=\"9.4\" baseline-shift=\"sub\">4</tspan></text><line x1=\"575\" y1=\"100\" x2=\"575\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"575.0,55.0 577.9,61.4 572.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"216\" y=\"108\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-style=\"italic\">h<tspan font-size=\"8.6\" baseline-shift=\"sub\">0</tspan></text><line x1=\"206\" y1=\"122\" x2=\"232.7\" y2=\"122\" stroke=\"#FF8C42\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"239.0,122.0 232.6,124.9 232.6,119.1\" fill=\"#FF8C42\"/><text x=\"420\" y=\"238\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">одни и те же веса W, U, V на всех шагах</text></svg>",
     "caption": "Развёртка RNN во времени: сеть — это одна ячейка, применённая к каждому элементу последовательности по очереди",
     "width": 640
    },
    {
     "t": "ul",
     "items": [
      "Разделение весов по времени — то же, что разделение весов в свёртке по пространству: сеть обрабатывает последовательность любой длины фиксированным числом параметров.",
      "Для классификации текста (многие к одному) берут последнее состояние \\(h_T\\) или усредняют все \\(h_t\\) и подают в линейный слой.",
      "Для разметки токенов (многие ко многим) выход считают на каждом шаге."
     ]
    },
    {
     "t": "p",
     "text": "Обучают RNN обычным обратным распространением по **развёрнутому** графу — это называется **backpropagation through time** (BPTT). Градиент по общим весам — сумма вкладов от всех шагов. Для очень длинных последовательностей развёртку обрезают окнами (truncated BPTT)."
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\n\ntorch.manual_seed(0)\nrnn = nn.RNN(input_size=4, hidden_size=3, batch_first=True)\nx = torch.randn(2, 5, 4)                 # батч 2, длина 5, размер входа 4\nout, h_last = rnn(x)\nprint('все состояния:', tuple(out.shape), ' последнее:', tuple(h_last.shape))\n\n# то же самое циклом по формуле h_t = tanh(W x_t + U h_{t-1} + b)\nW, U = rnn.weight_ih_l0, rnn.weight_hh_l0\nb = rnn.bias_ih_l0 + rnn.bias_hh_l0\nh = torch.zeros(2, 3)\nfor t in range(5):\n    h = torch.tanh(x[:, t] @ W.T + h @ U.T + b)\nprint('ручной цикл совпадает с nn.RNN:', torch.allclose(h, h_last[0], atol=1e-6))",
     "out": "все состояния: (2, 5, 3)  последнее: (1, 2, 3)\nручной цикл совпадает с nn.RNN: True"
    }
   ],
   "terms": [
    [
     "скрытое состояние",
     "вектор h_t, в котором RNN хранит информацию о прочитанной части последовательности."
    ],
    [
     "BPTT",
     "обратное распространение через развёрнутую во времени сеть."
    ]
   ]
  },
  {
   "id": "bidirectional",
   "num": "4.4",
   "title": "Двунаправленные и многослойные RNN",
   "blocks": [
    {
     "t": "p",
     "text": "Обычная RNN в момент \\(t\\) знает только **прошлое**. Но для разметки слова часто важен и правый контекст: в «Мама мыла раму» роль слова «мыла» (глагол, а не существительное) понятна по соседям с обеих сторон."
    },
    {
     "t": "ul",
     "items": [
      "**Двунаправленная RNN** (bidirectional) запускает две независимые RNN: одну слева направо, другую справа налево, — и склеивает их состояния: \\(h_t = [\\overrightarrow{h_t};\\ \\overleftarrow{h_t}]\\). Каждое состояние знает всю фразу. Подходит для задач, где весь текст известен заранее: классификация, NER. Не подходит для генерации, где будущего ещё нет.",
      "**Многослойная** (stacked) RNN: последовательность состояний первого слоя служит входом второго и так далее. Обычно 2–4 слоя; между слоями ставят dropout."
     ]
    },
    {
     "t": "code",
     "text": "from torch import nn\nimport torch\n\nlstm = nn.LSTM(input_size=32, hidden_size=64, num_layers=2, bidirectional=True, batch_first=True, dropout=0.2)\nout, (h, c) = lstm(torch.randn(8, 20, 32))\nprint('выход на каждом шаге:', tuple(out.shape), '← 2 направления × 64')\nprint('финальные состояния:', tuple(h.shape), '← 2 слоя × 2 направления')",
     "out": "выход на каждом шаге: (8, 20, 128) ← 2 направления × 64\nфинальные состояния: (4, 8, 64) ← 2 слоя × 2 направления"
    }
   ],
   "terms": [
    [
     "bidirectional RNN",
     "две RNN в противоположных направлениях, состояния склеиваются."
    ]
   ]
  },
  {
   "id": "gradients",
   "num": "4.5",
   "title": "Взрыв и затухание градиента",
   "blocks": [
    {
     "t": "p",
     "text": "Градиент потерь на шаге \\(T\\) по состоянию на шаге \\(t\\) — произведение якобианов всех промежуточных шагов:"
    },
    {
     "t": "tex",
     "rows": [
      [
       "произведение",
       "\\frac{\\partial h_T}{\\partial h_t} = \\prod_{k=t+1}^{T} \\frac{\\partial h_k}{\\partial h_{k-1}} = \\prod_{k=t+1}^{T} \\mathrm{diag}\\big(1 - h_k^2\\big)\\, U"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Это произведение \\(T - t\\) матриц. Если их «типичный масштаб» (спектральная норма) меньше 1, произведение экспоненциально стремится к нулю — **затухание градиента**: сеть не может выучить зависимости между далёкими словами. Если больше 1 — экспоненциально растёт — **взрыв градиента**: обучение разваливается, веса становятся NaN. Производная tanh не больше 1, поэтому в RNN чаще встречается затухание."
    },
    {
     "t": "plot",
     "caption": "Логарифм нормы градиента ∂h_T/∂h_0 в рекуррентной сети размера 64 в зависимости от длины T (настоящий расчёт autograd). Масштаб матрицы U: 0,5 — градиент уменьшается в 10 раз примерно каждые 3 шага; 1 — медленно затухает из-за tanh; 1,5 без tanh — растёт экспоненциально",
     "height": 290,
     "x": {
      "min": 1,
      "max": 58,
      "step": 6,
      "label": "длина T"
     },
     "y": {
      "min": -20,
      "max": 15,
      "step": 5,
      "label": "log₁₀ нормы"
     },
     "series": [
      {
       "type": "line",
       "points": [
        [
         1,
         0.598
        ],
        [
         4,
         -0.324
        ],
        [
         7,
         -1.243
        ],
        [
         10,
         -2.158
        ],
        [
         13,
         -3.076
        ],
        [
         16,
         -3.996
        ],
        [
         19,
         -4.934
        ],
        [
         22,
         -5.843
        ],
        [
         25,
         -6.767
        ],
        [
         28,
         -7.695
        ],
        [
         31,
         -8.602
        ],
        [
         34,
         -9.52
        ],
        [
         37,
         -10.447
        ],
        [
         40,
         -11.382
        ],
        [
         43,
         -12.295
        ],
        [
         46,
         -13.207
        ],
        [
         49,
         -14.115
        ],
        [
         52,
         -15.037
        ],
        [
         55,
         -15.975
        ],
        [
         58,
         -16.891
        ]
       ],
       "color": "blue",
       "label": "масштаб 0,5"
      },
      {
       "type": "line",
       "points": [
        [
         1,
         0.899
        ],
        [
         4,
         0.865
        ],
        [
         7,
         0.794
        ],
        [
         10,
         0.688
        ],
        [
         13,
         0.604
        ],
        [
         16,
         0.494
        ],
        [
         19,
         0.475
        ],
        [
         22,
         0.374
        ],
        [
         25,
         0.276
        ],
        [
         28,
         0.198
        ],
        [
         31,
         0.069
        ],
        [
         34,
         0.05
        ],
        [
         37,
         -0.11
        ],
        [
         40,
         -0.161
        ],
        [
         43,
         -0.234
        ],
        [
         46,
         -0.283
        ],
        [
         49,
         -0.337
        ],
        [
         52,
         -0.364
        ],
        [
         55,
         -0.438
        ],
        [
         58,
         -0.635
        ]
       ],
       "color": "green",
       "label": "масштаб 1"
      },
      {
       "type": "line",
       "points": [
        [
         1,
         1.079
        ],
        [
         4,
         1.607
        ],
        [
         7,
         2.136
        ],
        [
         10,
         2.664
        ],
        [
         13,
         3.192
        ],
        [
         16,
         3.721
        ],
        [
         19,
         4.249
        ],
        [
         22,
         4.777
        ],
        [
         25,
         5.305
        ],
        [
         28,
         5.834
        ],
        [
         31,
         6.362
        ],
        [
         34,
         6.89
        ],
        [
         37,
         7.418
        ],
        [
         40,
         7.947
        ],
        [
         43,
         8.475
        ],
        [
         46,
         9.003
        ],
        [
         49,
         9.532
        ],
        [
         52,
         10.06
        ],
        [
         55,
         10.588
        ],
        [
         58,
         11.116
        ]
       ],
       "color": "red",
       "label": "масштаб 1,5"
      },
      {
       "type": "hline",
       "y": 0,
       "color": "gray"
      }
     ],
     "legendLeft": true
    },
    {
     "t": "table",
     "caption": "Таблица 3. Что с этим делают",
     "headers": [
      "Проблема",
      "Решение"
     ],
     "rows": [
      [
       "взрыв градиента",
       "**gradient clipping**: если норма градиента больше порога, градиент масштабируют до порога — `clip_grad_norm_`"
      ],
      [
       "затухание градиента",
       "архитектуры с «аддитивной» памятью: LSTM и GRU (раздел 4.6); остаточные связи; механизм внимания (раздел 4.8)"
      ],
      [
       "оба",
       "аккуратная инициализация (ортогональная для U), нормализация (LayerNorm), меньшая скорость обучения"
      ]
     ]
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\n\nmodel = nn.LSTM(10, 20)\nout, _ = model(torch.randn(50, 1, 10))\n(out.sum() * 1000).backward()                    # искусственно огромные градиенты\nbefore = torch.cat([p.grad.flatten() for p in model.parameters()]).norm()\nnn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)\nafter = torch.cat([p.grad.flatten() for p in model.parameters()]).norm()\nprint(f'норма градиента до: {before:.1f}, после клиппинга: {after:.3f}')",
     "out": "норма градиента до: 149693.9, после клиппинга: 1.000"
    }
   ],
   "terms": [
    [
     "затухание градиента",
     "экспоненциальное уменьшение градиента с расстоянием по времени."
    ],
    [
     "взрыв градиента",
     "экспоненциальный рост градиента; лечится клиппингом."
    ],
    [
     "gradient clipping",
     "ограничение нормы градиента сверху."
    ]
   ]
  },
  {
   "id": "lstm",
   "num": "4.6",
   "title": "LSTM и GRU",
   "blocks": [
    {
     "t": "p",
     "text": "**LSTM** (Long Short-Term Memory, 1997) добавляет к RNN отдельное **состояние ячейки** \\(c_t\\) — «конвейер памяти», который проходит через шаги почти без изменений. Что стирать, что записывать и что выдавать наружу, решают **гейты** — сигмоидные слои со значениями от 0 («закрыто») до 1 («открыто»)."
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 660 338\" role=\"img\" aria-label=\"Ячейка LSTM: состояние ячейки проходит сверху, гейты забывания, записи и выхода управляют им\"><text x=\"20\" y=\"38\" font-size=\"13\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"#E3B341\" font-style=\"italic\">c<tspan font-size=\"9.4\" baseline-shift=\"sub\">t−1</tspan></text><text x=\"640\" y=\"38\" font-size=\"13\" text-anchor=\"end\" dominant-baseline=\"central\" fill=\"#E3B341\" font-style=\"italic\">c<tspan font-size=\"9.4\" baseline-shift=\"sub\">t</tspan></text><line x1=\"20\" y1=\"62\" x2=\"176\" y2=\"62\" stroke=\"#E3B341\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"204\" y1=\"62\" x2=\"316\" y2=\"62\" stroke=\"#E3B341\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"344\" y1=\"62\" x2=\"633.7\" y2=\"62\" stroke=\"#E3B341\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><polygon points=\"640.0,62.0 633.6,64.9 633.6,59.1\" fill=\"#E3B341\"/><circle cx=\"190\" cy=\"62\" r=\"14\" class=\"dg-bg\"/><circle cx=\"190\" cy=\"62\" r=\"14\" fill=\"#E3B341\" fill-opacity=\"0.16\" stroke=\"#E3B341\" stroke-width=\"1.5\"/><text x=\"190\" y=\"62\" font-size=\"16\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">×</text><circle cx=\"330\" cy=\"62\" r=\"14\" class=\"dg-bg\"/><circle cx=\"330\" cy=\"62\" r=\"14\" fill=\"#E3B341\" fill-opacity=\"0.16\" stroke=\"#E3B341\" stroke-width=\"1.5\"/><text x=\"330\" y=\"62\" font-size=\"16\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">+</text><rect x=\"160\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" class=\"dg-bg\"/><rect x=\"160\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"190\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-style=\"italic\">f<tspan font-size=\"9.0\" baseline-shift=\"sub\">t</tspan></text><text x=\"190\" y=\"243\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\">σ</text><rect x=\"260\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" class=\"dg-bg\"/><rect x=\"260\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"290\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-style=\"italic\">i<tspan font-size=\"9.0\" baseline-shift=\"sub\">t</tspan></text><text x=\"290\" y=\"243\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\">σ</text><rect x=\"340\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" class=\"dg-bg\"/><rect x=\"340\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#BC8CFF\" fill-opacity=\"0.14\" stroke=\"#BC8CFF\" stroke-width=\"1.5\"/><text x=\"370\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-style=\"italic\">g<tspan font-size=\"9.0\" baseline-shift=\"sub\">t</tspan></text><text x=\"370\" y=\"243\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#BC8CFF\">tanh</text><rect x=\"440\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" class=\"dg-bg\"/><rect x=\"440\" y=\"206\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"470\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-style=\"italic\">o<tspan font-size=\"9.0\" baseline-shift=\"sub\">t</tspan></text><text x=\"470\" y=\"243\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\">σ</text><line x1=\"190\" y1=\"206\" x2=\"190\" y2=\"83.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"190.0,77.0 192.9,83.4 187.1,83.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><circle cx=\"330\" cy=\"140\" r=\"13\" class=\"dg-bg\"/><circle cx=\"330\" cy=\"140\" r=\"13\" fill=\"#8B949E\" fill-opacity=\"0.16\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"330\" y=\"140\" font-size=\"15\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">×</text><line x1=\"296\" y1=\"206\" x2=\"318.393\" y2=\"156.735\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"321.0,151.0 321.0,158.0 315.8,155.6\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"364\" y1=\"206\" x2=\"341.607\" y2=\"156.735\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"339.0,151.0 344.2,155.6 339.0,158.0\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"330\" y1=\"127\" x2=\"330\" y2=\"83.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"330.0,77.0 332.9,83.4 327.1,83.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"522\" y=\"108\" width=\"56\" height=\"30\" rx=\"6\" class=\"dg-bg\"/><rect x=\"522\" y=\"108\" width=\"56\" height=\"30\" rx=\"6\" fill=\"#BC8CFF\" fill-opacity=\"0.14\" stroke=\"#BC8CFF\" stroke-width=\"1.5\"/><text x=\"550\" y=\"123\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#BC8CFF\">tanh</text><line x1=\"550\" y1=\"62\" x2=\"550\" y2=\"100.7\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"550.0,107.0 547.1,100.6 552.9,100.6\" fill=\"currentColor\" fill-opacity=\"0.75\"/><circle cx=\"550\" cy=\"227\" r=\"13\" class=\"dg-bg\"/><circle cx=\"550\" cy=\"227\" r=\"13\" fill=\"#8B949E\" fill-opacity=\"0.16\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"550\" y=\"227\" font-size=\"15\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">×</text><line x1=\"550\" y1=\"138\" x2=\"550\" y2=\"206.7\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"550.0,213.0 547.1,206.6 552.9,206.6\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"500\" y1=\"227\" x2=\"529.7\" y2=\"227\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"536.0,227.0 529.6,229.9 529.6,224.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"563\" y1=\"227\" x2=\"633.7\" y2=\"227\" stroke=\"#3FB950\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"640.0,227.0 633.6,229.9 633.6,224.1\" fill=\"#3FB950\"/><text x=\"604\" y=\"211\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-style=\"italic\">h<tspan font-size=\"9.4\" baseline-shift=\"sub\">t</tspan></text><line x1=\"124\" y1=\"290\" x2=\"470\" y2=\"290\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.6\" stroke-linecap=\"round\"/><line x1=\"190\" y1=\"290\" x2=\"190\" y2=\"263.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"190.0,257.0 192.9,263.4 187.1,263.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"290\" y1=\"290\" x2=\"290\" y2=\"263.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"290.0,257.0 292.9,263.4 287.1,263.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"370\" y1=\"290\" x2=\"370\" y2=\"263.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"370.0,257.0 372.9,263.4 367.1,263.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"470\" y1=\"290\" x2=\"470\" y2=\"263.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"470.0,257.0 472.9,263.4 467.1,263.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"20\" y=\"290\" font-size=\"12.5\" text-anchor=\"start\" dominant-baseline=\"central\" class=\"dg-strong\" font-style=\"italic\">[h<tspan font-size=\"9.0\" baseline-shift=\"sub\">t−1</tspan>, x<tspan font-size=\"9.0\" baseline-shift=\"sub\">t</tspan>]</text><text x=\"330\" y=\"322\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">f — что забыть, i — сколько записать, g — что записать, o — что выдать наружу</text></svg>",
     "caption": "Состояние ячейки c (жёлтая линия) меняется только поэлементным умножением и сложением — градиент проходит по нему через много шагов почти без затухания",
     "width": 660
    },
    {
     "t": "tex",
     "rows": [
      [
       "гейты",
       "f_t = \\sigma(W_f[h_{t-1}, x_t] + b_f),\\quad i_t = \\sigma(W_i[h_{t-1}, x_t] + b_i),\\quad o_t = \\sigma(W_o[h_{t-1}, x_t] + b_o)"
      ],
      [
       "кандидат",
       "g_t = \\tanh(W_g[h_{t-1}, x_t] + b_g)"
      ],
      [
       "память",
       "c_t = f_t \\odot c_{t-1} + i_t \\odot g_t"
      ],
      [
       "выход",
       "h_t = o_t \\odot \\tanh(c_t)"
      ]
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Гейт забывания** \\(f_t\\) решает, какую часть старой памяти сохранить. Например, при начале нового предложения можно забыть род подлежащего прошлого.",
      "**Гейт записи** \\(i_t\\) и **кандидат** \\(g_t\\): что и в каком объёме добавить в память.",
      "**Гейт выхода** \\(o_t\\): какая часть памяти нужна для текущего выхода \\(h_t\\).",
      "Главное: \\(c_t\\) обновляется **сложением**. Производная \\(\\partial c_t / \\partial c_{t-1} = f_t\\) — если сеть держит гейт забывания открытым (около 1), градиент проходит через десятки и сотни шагов. Поэтому смещение гейта забывания часто инициализируют единицей."
     ]
    },
    {
     "t": "h3",
     "text": "4.6.1. GRU"
    },
    {
     "t": "p",
     "text": "**GRU** (Gated Recurrent Unit, 2014) — упрощённый вариант: нет отдельного состояния ячейки, а гейтов два. Гейт обновления \\(z_t\\) решает, какую долю состояния заменить новым кандидатом, гейт сброса \\(r_t\\) — насколько учитывать прошлое при вычислении кандидата."
    },
    {
     "t": "tex",
     "rows": [
      [
       "гейты",
       "z_t = \\sigma(W_z[h_{t-1}, x_t]),\\qquad r_t = \\sigma(W_r[h_{t-1}, x_t])"
      ],
      [
       "кандидат",
       "\\tilde h_t = \\tanh(W[r_t \\odot h_{t-1}, x_t])"
      ],
      [
       "состояние",
       "h_t = (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde h_t"
      ]
     ]
    },
    {
     "t": "code",
     "text": "from torch import nn\n\ncount = lambda m: sum(p.numel() for p in m.parameters())\nfor cls in (nn.RNN, nn.GRU, nn.LSTM):\n    print(f'{cls.__name__:5s}: {count(cls(input_size=64, hidden_size=128)):6d} параметров')",
     "out": "RNN  :  24832 параметров\nGRU  :  74496 параметров\nLSTM :  99328 параметров"
    },
    {
     "t": "p",
     "text": "Соотношение 1 : 3 : 4 — по числу «матриц-блоков»: у простой RNN одна пара матриц, у GRU — три (два гейта и кандидат), у LSTM — четыре (три гейта и кандидат)."
    },
    {
     "t": "table",
     "caption": "Таблица 4. Сравнение рекуррентных ячеек",
     "headers": [
      "",
      "RNN",
      "GRU",
      "LSTM"
     ],
     "rows": [
      [
       "память",
       "только h",
       "только h, с гейтами",
       "h и отдельная c"
      ],
      [
       "гейты",
       "нет",
       "2",
       "3"
      ],
      [
       "длинные зависимости",
       "плохо",
       "хорошо",
       "хорошо"
      ],
      [
       "параметров",
       "меньше всего",
       "≈ 3 × RNN",
       "≈ 4 × RNN"
      ],
      [
       "когда брать",
       "короткие последовательности, учебные задачи",
       "когда важна скорость",
       "классический выбор по умолчанию"
      ]
     ]
    }
   ],
   "terms": [
    [
     "LSTM",
     "рекуррентная ячейка с состоянием ячейки и гейтами забывания, записи и выхода."
    ],
    [
     "GRU",
     "упрощённая ячейка с гейтами обновления и сброса."
    ],
    [
     "гейт",
     "сигмоидный слой, поэлементно пропускающий долю сигнала от 0 до 1."
    ]
   ]
  },
  {
   "id": "seq2seq",
   "num": "4.7",
   "title": "Seq2seq: энкодер и декодер",
   "blocks": [
    {
     "t": "p",
     "text": "Для перевода длина входа и выхода разная, и выход нельзя выдавать синхронно со входом. Архитектура **seq2seq** (2014) состоит из двух RNN:"
    },
    {
     "t": "ul",
     "items": [
      "**энкодер** читает исходную фразу и сжимает её в вектор контекста — своё последнее скрытое состояние;",
      "**декодер** — языковая модель, обусловленная этим вектором: начиная со специального токена `<bos>`, на каждом шаге предсказывает распределение следующего токена, пока не выдаст `<eos>`."
     ]
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 660 250\" role=\"img\" aria-label=\"Seq2seq: энкодер читает исходную фразу, его последнее состояние передаётся декодеру, который генерирует перевод слово за словом\"><rect x=\"20\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"20\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"52\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">энк</text><rect x=\"24\" y=\"186\" width=\"56\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"24\" y=\"186\" width=\"56\" height=\"28\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"52\" y=\"200\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">я</text><line x1=\"52\" y1=\"186\" x2=\"52\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"52.0,133.0 54.9,139.4 49.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"84\" y1=\"112\" x2=\"98.7\" y2=\"112\" stroke=\"#58A6FF\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"105.0,112.0 98.6,114.9 98.6,109.1\" fill=\"#58A6FF\"/><rect x=\"106\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"106\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"138\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">энк</text><rect x=\"110\" y=\"186\" width=\"56\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"110\" y=\"186\" width=\"56\" height=\"28\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"138\" y=\"200\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">люблю</text><line x1=\"138\" y1=\"186\" x2=\"138\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"138.0,133.0 140.9,139.4 135.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"170\" y1=\"112\" x2=\"184.7\" y2=\"112\" stroke=\"#58A6FF\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"191.0,112.0 184.6,114.9 184.6,109.1\" fill=\"#58A6FF\"/><rect x=\"192\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"192\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"224\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">энк</text><rect x=\"196\" y=\"186\" width=\"56\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"196\" y=\"186\" width=\"56\" height=\"28\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"224\" y=\"200\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">ML</text><line x1=\"224\" y1=\"186\" x2=\"224\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"224.0,133.0 226.9,139.4 221.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"256\" y1=\"112\" x2=\"293.7\" y2=\"112\" stroke=\"#E3B341\" stroke-width=\"2\" stroke-linecap=\"round\"/><polygon points=\"300.0,112.0 293.6,114.9 293.6,109.1\" fill=\"#E3B341\"/><text x=\"278\" y=\"82\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#E3B341\">контекст</text><text x=\"278\" y=\"98\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#E3B341\">вектор</text><rect x=\"302\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"302\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"334\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">дек</text><rect x=\"304\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"304\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"334\" y=\"200\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">&lt;bos&gt;</text><line x1=\"334\" y1=\"186\" x2=\"334\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"334.0,133.0 336.9,139.4 331.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"304\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"304\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"334\" y=\"40\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">I</text><line x1=\"334\" y1=\"92\" x2=\"334\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"334.0,55.0 336.9,61.4 331.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"366\" y1=\"112\" x2=\"382.7\" y2=\"112\" stroke=\"#3FB950\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"389.0,112.0 382.6,114.9 382.6,109.1\" fill=\"#3FB950\"/><path d=\"M364 40 C380 40 376 200 391 200\" fill=\"none\" stroke=\"#3FB950\" stroke-width=\"1.1\" stroke-dasharray=\"3 3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"390\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"390\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"422\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">дек</text><rect x=\"392\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"392\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"422\" y=\"200\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">I</text><line x1=\"422\" y1=\"186\" x2=\"422\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"422.0,133.0 424.9,139.4 419.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"392\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"392\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"422\" y=\"40\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">love</text><line x1=\"422\" y1=\"92\" x2=\"422\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"422.0,55.0 424.9,61.4 419.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"454\" y1=\"112\" x2=\"470.7\" y2=\"112\" stroke=\"#3FB950\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"477.0,112.0 470.6,114.9 470.6,109.1\" fill=\"#3FB950\"/><path d=\"M452 40 C468 40 464 200 479 200\" fill=\"none\" stroke=\"#3FB950\" stroke-width=\"1.1\" stroke-dasharray=\"3 3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"478\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"478\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"510\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">дек</text><rect x=\"480\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"480\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"510\" y=\"200\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">love</text><line x1=\"510\" y1=\"186\" x2=\"510\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"510.0,133.0 512.9,139.4 507.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"480\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"480\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"510\" y=\"40\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">ML</text><line x1=\"510\" y1=\"92\" x2=\"510\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"510.0,55.0 512.9,61.4 507.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"542\" y1=\"112\" x2=\"558.7\" y2=\"112\" stroke=\"#3FB950\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"565.0,112.0 558.6,114.9 558.6,109.1\" fill=\"#3FB950\"/><path d=\"M540 40 C556 40 552 200 567 200\" fill=\"none\" stroke=\"#3FB950\" stroke-width=\"1.1\" stroke-dasharray=\"3 3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"566\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"566\" y=\"92\" width=\"64\" height=\"40\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"598\" y=\"112\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">дек</text><rect x=\"568\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"568\" y=\"186\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"598\" y=\"200\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">ML</text><line x1=\"598\" y1=\"186\" x2=\"598\" y2=\"139.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"598.0,133.0 600.9,139.4 595.1,139.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"568\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" class=\"dg-bg\"/><rect x=\"568\" y=\"26\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"598\" y=\"40\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">&lt;eos&gt;</text><line x1=\"598\" y1=\"92\" x2=\"598\" y2=\"61.3\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"598.0,55.0 600.9,61.4 595.1,61.4\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"118\" y=\"238\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">энкодер</text><text x=\"477\" y=\"238\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">декодер: выход шага — вход следующего</text></svg>",
     "caption": "Энкодер сжимает всю исходную фразу в один вектор; декодер начинает с токена <bos> и на каждом шаге получает своё предыдущее слово (пунктир)",
     "width": 660
    },
    {
     "t": "h3",
     "text": "4.7.1. Обучение: teacher forcing"
    },
    {
     "t": "p",
     "text": "Модель учат минимизировать сумму кросс-энтропий по всем шагам декодера. Если на вход декодеру подавать **его собственные** предсказания, одна ранняя ошибка испортит всё продолжение, и модель будет учиться продолжать неверное начало. Поэтому при обучении на вход подают **правильные** предыдущие токены — это **teacher forcing**. Обучение становится стабильным и параллельным по шагам."
    },
    {
     "t": "p",
     "text": "Обратная сторона — **exposure bias**: на обучении модель ни разу не видела собственных ошибок, а на применении ей приходится продолжать свои же, иногда неверные, предсказания. Смягчают это **scheduled sampling** — постепенно, по ходу обучения, всё чаще подают модели её собственные предсказания."
    },
    {
     "t": "h3",
     "text": "4.7.2. Применение: как выбрать выходную последовательность"
    },
    {
     "t": "p",
     "text": "На применении декодер выдаёт распределение \\(p(y_t \\mid y_{<t}, x)\\), и из него нужно построить фразу. Хотим найти самую вероятную последовательность целиком, но перебрать все варианты невозможно: при словаре 30 000 и длине 20 их \\(30\\,000^{20}\\)."
    },
    {
     "t": "ul",
     "items": [
      "**Жадный поиск** (greedy): на каждом шаге брать самое вероятное слово. Быстро, но может пропустить лучшую фразу: самое вероятное первое слово не обязательно ведёт к лучшему продолжению.",
      "**Лучевой поиск** (beam search): держать \\(k\\) лучших частичных гипотез (обычно 4–10), на каждом шаге продлевать каждую всеми словами и снова оставлять \\(k\\) лучших по суммарной лог-вероятности. Стандарт для перевода и суммаризации."
     ]
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 600 288\" role=\"img\" aria-label=\"Жадный поиск и лучевой поиск: жадный выбирает «кот», а лучевой с шириной 2 находит более вероятную фразу «собака спит»\"><rect x=\"20\" y=\"112\" width=\"70\" height=\"36\" rx=\"8\" class=\"dg-bg\"/><rect x=\"20\" y=\"112\" width=\"70\" height=\"36\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"55\" y=\"130\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">&lt;bos&gt;</text><line x1=\"90\" y1=\"130\" x2=\"172.85\" y2=\"71.6285\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"178.0,68.0 174.4,74.0 171.1,69.3\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"180\" y=\"50\" width=\"90\" height=\"36\" rx=\"8\" class=\"dg-bg\"/><rect x=\"180\" y=\"50\" width=\"90\" height=\"36\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"225\" y=\"68\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">кот  0,5</text><line x1=\"90\" y1=\"130\" x2=\"171.828\" y2=\"146.738\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"178.0,148.0 171.2,149.5 172.3,143.9\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"180\" y=\"130\" width=\"90\" height=\"36\" rx=\"8\" class=\"dg-bg\"/><rect x=\"180\" y=\"130\" width=\"90\" height=\"36\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"225\" y=\"148\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">собака  0,4</text><line x1=\"90\" y1=\"130\" x2=\"173.791\" y2=\"223.312\" stroke=\"#8B949E\" stroke-width=\"1.6\" stroke-opacity=\"0.5\" stroke-linecap=\"round\"/><polygon points=\"178.0,228.0 171.6,225.2 175.9,221.3\" fill=\"#8B949E\"/><rect x=\"180\" y=\"210\" width=\"90\" height=\"36\" rx=\"8\" class=\"dg-bg\"/><rect x=\"180\" y=\"210\" width=\"90\" height=\"36\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"225\" y=\"228\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">мышь  0,1</text><line x1=\"270\" y1=\"68\" x2=\"352.058\" y2=\"39.0932\" stroke=\"#FF8C42\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"358.0,37.0 352.9,41.8 351.0,36.4\" fill=\"#FF8C42\"/><rect x=\"360\" y=\"22\" width=\"150\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"360\" y=\"22\" width=\"150\" height=\"30\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"435\" y=\"37\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">спит: 0,20</text><line x1=\"270\" y1=\"68\" x2=\"351.842\" y2=\"85.6704\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"358.0,87.0 351.1,88.4 352.4,82.9\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"360\" y=\"72\" width=\"150\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"360\" y=\"72\" width=\"150\" height=\"30\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"435\" y=\"87\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">ест: 0,15</text><line x1=\"270\" y1=\"148\" x2=\"351.71\" y2=\"152.643\" stroke=\"#3FB950\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><polygon points=\"358.0,153.0 351.5,155.5 351.8,149.8\" fill=\"#3FB950\"/><rect x=\"360\" y=\"138\" width=\"150\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"360\" y=\"138\" width=\"150\" height=\"30\" rx=\"8\" fill=\"#3FB950\" fill-opacity=\"0.14\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"435\" y=\"153\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\" font-weight=\"600\">спит: 0,36</text><line x1=\"270\" y1=\"148\" x2=\"352.658\" y2=\"199.661\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"358.0,203.0 351.1,202.0 354.1,197.2\" fill=\"currentColor\" fill-opacity=\"0.75\"/><rect x=\"360\" y=\"188\" width=\"150\" height=\"30\" rx=\"8\" class=\"dg-bg\"/><rect x=\"360\" y=\"188\" width=\"150\" height=\"30\" rx=\"8\" fill=\"#8B949E\" fill-opacity=\"0.14\" stroke=\"#8B949E\" stroke-width=\"1.5\"/><text x=\"435\" y=\"203\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#8B949E\" font-weight=\"600\">ест: 0,04</text><text x=\"518\" y=\"37\" font-size=\"12\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"#FF8C42\">← жадный</text><text x=\"518\" y=\"153\" font-size=\"12\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"#3FB950\">← луч</text><text x=\"300\" y=\"272\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">число в узле — вероятность всей фразы: произведение вероятностей шагов</text></svg>",
     "caption": "Жадный поиск берёт самое вероятное слово на каждом шаге и получает «кот спит» с вероятностью 0,20. Лучевой поиск с шириной 2 держит два лучших варианта и находит «собака спит» с вероятностью 0,36",
     "width": 600
    },
    {
     "t": "code",
     "text": "import math\n\nLM = {(): {'кот': 0.5, 'собака': 0.4, 'мышь': 0.1},\n      ('кот',): {'спит': 0.4, 'ест': 0.3, 'бежит': 0.3},\n      ('собака',): {'спит': 0.9, 'ест': 0.1},\n      ('мышь',): {'спит': 0.5, 'бежит': 0.5}}\n\ndef greedy():\n    seq = ()\n    for _ in range(2):\n        seq += (max(LM[seq], key=LM[seq].get),)\n    return seq\n\ndef beam(width):\n    beams = [((), 0.0)]                      # (префикс, сумма логарифмов вероятностей)\n    for _ in range(2):\n        cand = [(seq + (w,), lp + math.log(p)) for seq, lp in beams for w, p in LM[seq].items()]\n        beams = sorted(cand, key=lambda c: -c[1])[:width]\n    return beams[0]\n\ng = greedy()\nprint('жадный:', ' '.join(g), f'p = {LM[()][g[0]] * LM[g[:1]][g[1]]:.2f}')\nseq, lp = beam(2)\nprint('луч 2: ', ' '.join(seq), f'p = {math.exp(lp):.2f}')",
     "out": "жадный: кот спит p = 0.20\nлуч 2:  собака спит p = 0.36"
    },
    {
     "t": "p",
     "text": "Для **творческой генерации** (диалог, истории) лучевой поиск даёт скучные и повторяющиеся тексты. Там слово **сэмплируют** из распределения, управляя разнообразием:"
    },
    {
     "t": "ul",
     "items": [
      "**температура** \\(T\\): логиты делят на \\(T\\) перед softmax; \\(T < 1\\) — увереннее и однообразнее, \\(T > 1\\) — разнообразнее и рискованнее;",
      "**top-k**: выбирать только среди \\(k\\) самых вероятных слов;",
      "**top-p** (nucleus sampling): среди минимального набора слов с суммарной вероятностью \\(p\\)."
     ]
    },
    {
     "t": "code",
     "text": "import torch\n\nlogits = torch.tensor([3.0, 2.0, 1.0, 0.0])\nfor T in [0.5, 1.0, 2.0]:\n    print(f'T = {T}: ', (logits / T).softmax(0).numpy().round(3))",
     "out": "T = 0.5:  [0.865 0.117 0.016 0.002]\nT = 1.0:  [0.644 0.237 0.087 0.032]\nT = 2.0:  [0.455 0.276 0.167 0.102]"
    },
    {
     "t": "h3",
     "text": "4.7.3. Один ко многим"
    },
    {
     "t": "p",
     "text": "Задачи «один ко многим» решаются той же схемой с другим энкодером. Для подписи к картинке энкодер — свёрточная сеть из главы 3: её вектор признаков картинки становится начальным состоянием декодера, который генерирует описание слово за словом."
    }
   ],
   "terms": [
    [
     "seq2seq",
     "энкодер-декодер для преобразования последовательности в последовательность."
    ],
    [
     "teacher forcing",
     "подача правильных предыдущих токенов в декодер при обучении."
    ],
    [
     "exposure bias",
     "расхождение между обучением на правильных префиксах и генерацией на своих."
    ],
    [
     "beam search",
     "поиск, сохраняющий k лучших частичных гипотез."
    ]
   ]
  },
  {
   "id": "attention",
   "num": "4.8",
   "title": "Механизм внимания",
   "blocks": [
    {
     "t": "p",
     "text": "У seq2seq есть узкое место: вся исходная фраза, сколь угодно длинная, должна поместиться в **один вектор** фиксированного размера. Качество перевода заметно падало на длинных предложениях. **Механизм внимания** (Бахданау и соавторы, 2014) снимает это ограничение: декодер на каждом шаге сам «заглядывает» во **все** состояния энкодера и берёт из них то, что нужно сейчас."
    },
    {
     "t": "ol",
     "items": [
      "Для текущего состояния декодера \\(s_t\\) считаем **оценку важности** каждого состояния энкодера \\(h_j\\): \\(e_{tj} = \\mathrm{score}(s_t, h_j)\\). Это может быть маленький перцептрон (аддитивное внимание) или скалярное произведение.",
      "Превращаем оценки в **веса** через softmax: \\(\\alpha_{tj} \\ge 0\\), сумма по \\(j\\) равна 1.",
      "Строим **вектор контекста** — взвешенную сумму состояний энкодера: \\(c_t = \\sum_j \\alpha_{tj} h_j\\).",
      "Декодер использует \\(c_t\\) вместе со своим состоянием, чтобы предсказать следующее слово."
     ]
    },
    {
     "t": "tex",
     "rows": [
      [
       "веса",
       "\\alpha_{tj} = \\frac{\\exp(e_{tj})}{\\sum_k \\exp(e_{tk})}, \\qquad c_t = \\sum_j \\alpha_{tj}\\, h_j"
      ]
     ]
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 460 336\" role=\"img\" aria-label=\"Матрица весов внимания при переводе: каждое слово перевода смотрит в основном на соответствующее исходное слово\"><text x=\"176\" y=\"24\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">я</text><text x=\"248\" y=\"24\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">люблю</text><text x=\"320\" y=\"24\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">машинное</text><text x=\"392\" y=\"24\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">обучение</text><text x=\"130\" y=\"76\" font-size=\"12.5\" text-anchor=\"end\" dominant-baseline=\"central\" class=\"dg-strong\">I</text><text x=\"130\" y=\"148\" font-size=\"12.5\" text-anchor=\"end\" dominant-baseline=\"central\" class=\"dg-strong\">love</text><text x=\"130\" y=\"220\" font-size=\"12.5\" text-anchor=\"end\" dominant-baseline=\"central\" class=\"dg-strong\">machine</text><text x=\"130\" y=\"292\" font-size=\"12.5\" text-anchor=\"end\" dominant-baseline=\"central\" class=\"dg-strong\">learning</text><rect x=\"140\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.738\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"176\" y=\"76\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,86</text><rect x=\"212\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"212\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.114\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"248\" y=\"76\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,08</text><rect x=\"284\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"284\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.074\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"320\" y=\"76\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,03</text><rect x=\"356\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"356\" y=\"40\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.074\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"392\" y=\"76\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,03</text><rect x=\"140\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.106\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"176\" y=\"148\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,07</text><rect x=\"212\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"212\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.73\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"248\" y=\"148\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,85</text><rect x=\"284\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"284\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.082\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"320\" y=\"148\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,04</text><rect x=\"356\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"356\" y=\"112\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.082\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"392\" y=\"148\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,04</text><rect x=\"140\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.066\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"176\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,02</text><rect x=\"212\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"212\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.09\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"248\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,05</text><rect x=\"284\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"284\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.69\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"320\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,80</text><rect x=\"356\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"356\" y=\"184\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.154\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"392\" y=\"220\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,13</text><rect x=\"140\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.066\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"176\" y=\"292\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,02</text><rect x=\"212\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"212\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.074\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"248\" y=\"292\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,03</text><rect x=\"284\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"284\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.186\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"320\" y=\"292\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,17</text><rect x=\"356\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" class=\"dg-bg\"/><rect x=\"356\" y=\"256\" width=\"72\" height=\"72\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.674\" stroke=\"#FF8C42\" stroke-width=\"1\" stroke-opacity=\"0.35\"/><text x=\"392\" y=\"292\" font-size=\"12.5\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0,78</text></svg>",
     "caption": "Условный пример: строка — шаг декодера (слово перевода), столбец — слово источника, число — вес внимания; веса в каждой строке в сумме дают 1",
     "width": 460
    },
    {
     "t": "p",
     "text": "Веса внимания полезны и для интерпретации: по ним видно, на какие исходные слова модель смотрела, порождая каждое слово перевода. Для языков с разным порядком слов матрица уже не диагональная: при переводе «red car» → «voiture rouge» веса образуют «крест»."
    },
    {
     "t": "h3",
     "text": "4.8.1. Self-attention"
    },
    {
     "t": "p",
     "text": "Следующий шаг — применить внимание **внутри одной последовательности**: каждое слово строит своё новое представление как взвешенную сумму представлений всех слов той же фразы. Так «оно» в «Робот не поднял коробку, потому что оно было тяжёлым» может напрямую «посмотреть» на «коробку». В отличие от RNN, информации не нужно проходить через десятки шагов, а все позиции считаются **параллельно**. Если убрать рекуррентность совсем и строить сеть только на self-attention, получится трансформер — ему посвящена глава 5."
    }
   ],
   "terms": [
    [
     "attention",
     "механизм, вычисляющий взвешенную сумму состояний по весам релевантности."
    ],
    [
     "вектор контекста",
     "взвешенная сумма состояний энкодера для текущего шага декодера."
    ],
    [
     "self-attention",
     "внимание элементов последовательности друг на друга."
    ]
   ]
  },
  {
   "id": "texts",
   "num": "4.9",
   "title": "Подготовка текстов и аугментации",
   "blocks": [
    {
     "t": "h3",
     "text": "4.9.1. Предобработка"
    },
    {
     "t": "ol",
     "items": [
      "**Нормализация**: приведение к нижнему регистру (не всегда — для NER регистр важен), унификация кавычек и тире, «ё» → «е», удаление HTML и лишних пробелов.",
      "**Токенизация**: разбиение текста на предложения, а затем на токены.",
      "**Нормализация слов** для классических моделей: **стемминг** (обрезание окончаний: «бежали» → «бежа») или **лемматизация** (приведение к словарной форме: «бежали» → «бежать»; для русского — pymorphy, Natasha, Stanza). Для нейросетей с подсловными токенизаторами обычно не нужна.",
      "**Стоп-слова** («и», «в», «на») удаляют для мешка слов и TF-IDF, но не для нейросетей: «не» — стоп-слово, а смысл «понравилось» и «не понравилось» противоположный."
     ]
    },
    {
     "t": "h3",
     "text": "4.9.2. Уровни токенизации"
    },
    {
     "t": "table",
     "caption": "Таблица 5. Токенизация",
     "headers": [
      "Уровень",
      "Плюсы",
      "Минусы"
     ],
     "rows": [
      [
       "слова",
       "понятные токены",
       "огромный словарь, особенно для русского с падежами; незнакомые слова превращаются в `<unk>`"
      ],
      [
       "символы",
       "маленький словарь, нет незнакомых слов",
       "очень длинные последовательности, модели труднее собирать смысл"
      ],
      [
       "подслова (BPE, WordPiece, Unigram)",
       "частые слова — целиком, редкие — по частям; словарь 30–100 тысяч",
       "токены не всегда совпадают с морфемами"
      ]
     ]
    },
    {
     "t": "p",
     "text": "**BPE** (byte pair encoding) строит словарь подслов жадно: начинает с отдельных символов и раз за разом **сливает самую частую пару соседних токенов** в новый токен. Через несколько тысяч слияний частые слова становятся одним токеном, а редкие разбиваются на знакомые куски."
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\ncorpus = ['низкий', 'низший', 'новый', 'новейший', 'широкий', 'широчайший'] * 3\nwords = Counter(tuple(w) + ('</w>',) for w in corpus)       # слово → кортеж символов\n\ndef merge_step(words):\n    pairs = Counter()\n    for w, n in words.items():\n        for a, b in zip(w, w[1:]):\n            pairs[a, b] += n\n    (a, b), _ = pairs.most_common(1)[0]\n    merged = Counter()\n    for w, n in words.items():\n        out, i = [], 0\n        while i < len(w):\n            if i + 1 < len(w) and (w[i], w[i + 1]) == (a, b):\n                out.append(a + b); i += 2\n            else:\n                out.append(w[i]); i += 1\n        merged[tuple(out)] += n\n    return merged, a + b\n\nfor step in range(1, 9):\n    words, token = merge_step(words)\n    print(f'шаг {step}: новый токен «{token}»')\nprint('разбиение:', [' '.join(w) for w in words])",
     "out": "шаг 1: новый токен «й</w>»\nшаг 2: новый токен «ий</w>»\nшаг 3: новый токен «ший</w>»\nшаг 4: новый токен «ни»\nшаг 5: новый токен «низ»\nшаг 6: новый токен «кий</w>»\nшаг 7: новый токен «но»\nшаг 8: новый токен «нов»\nразбиение: ['низ кий</w>', 'низ ший</w>', 'нов ы й</w>', 'нов е й ший</w>', 'ш и р о кий</w>', 'ш и р о ч а й ший</w>']"
    },
    {
     "t": "h3",
     "text": "4.9.3. Батчи текстов разной длины"
    },
    {
     "t": "ul",
     "items": [
      "Короткие тексты дополняют токеном `<pad>` до длины самого длинного в батче, а слишком длинные обрезают.",
      "**Маска** отмечает настоящие токены, чтобы паддинг не влиял на результат: в RNN — через `pack_padded_sequence`, в трансформерах — через маску внимания.",
      "Чтобы паддинга было меньше, батчи собирают из текстов похожей длины (bucketing).",
      "Специальные токены: `<bos>` и `<eos>` — начало и конец, `<unk>` — неизвестный токен, `<sep>` и `<cls>` — разделитель и токен для классификации в BERT."
     ]
    },
    {
     "t": "h3",
     "text": "4.9.4. Аугментации текстов"
    },
    {
     "t": "p",
     "text": "Для текстов аугментации сложнее, чем для картинок: замена одного слова может изменить смысл. Используемые приёмы:"
    },
    {
     "t": "table",
     "caption": "Таблица 6. Аугментации для текстов",
     "headers": [
      "Приём",
      "Как работает",
      "Риск"
     ],
     "rows": [
      [
       "замена синонимами",
       "случайные слова заменяются синонимами из словаря или по близости эмбеддингов",
       "синоним может не подойти по контексту"
      ],
      [
       "случайные вставки, удаления, перестановки слов (EDA)",
       "небольшой «шум» в предложении",
       "на коротких текстах может исказить смысл"
      ],
      [
       "обратный перевод (back-translation)",
       "текст переводят на другой язык и обратно — получается перефраз",
       "нужен хороший переводчик; дорого"
      ],
      [
       "перефразирование языковой моделью",
       "LLM переписывает пример, сохраняя метку",
       "нужно проверять, что метка не изменилась"
      ],
      [
       "опечатки и шум символов",
       "устойчивость к реальным пользовательским текстам",
       "умеренно"
      ]
     ]
    }
   ],
   "terms": [
    [
     "лемматизация",
     "приведение слова к словарной форме."
    ],
    [
     "BPE",
     "токенизатор подслов, сливающий самые частые пары символов."
    ],
    [
     "паддинг",
     "дополнение коротких последовательностей служебным токеном."
    ],
    [
     "back-translation",
     "аугментация переводом на другой язык и обратно."
    ]
   ]
  },
  {
   "id": "summary",
   "num": "4.10",
   "title": "Шпаргалка",
   "blocks": [
    {
     "t": "table",
     "caption": "Таблица 7. Главное из главы",
     "headers": [
      "Тема",
      "Что запомнить"
     ],
     "rows": [
      [
       "эмбеддинги",
       "дистрибутивная гипотеза; word2vec (skip-gram, CBOW, negative sampling), GloVe, fastText; один вектор на слово"
      ],
      [
       "RNN",
       "h_t = tanh(Wx_t + Uh_{t−1} + b); общие веса по времени; BPTT"
      ],
      [
       "проблемы RNN",
       "затухание и взрыв градиента; клиппинг от взрыва, LSTM/GRU от затухания"
      ],
      [
       "LSTM",
       "c_t = f ⊙ c_{t−1} + i ⊙ g, h_t = o ⊙ tanh(c_t); аддитивная память"
      ],
      [
       "GRU",
       "два гейта, нет отдельной c; ≈ 3/4 параметров LSTM"
      ],
      [
       "seq2seq",
       "энкодер → вектор контекста → декодер; teacher forcing, exposure bias"
      ],
      [
       "декодирование",
       "greedy, beam search; для генерации — температура, top-k, top-p"
      ],
      [
       "внимание",
       "α = softmax(оценок), контекст — взвешенная сумма состояний энкодера"
      ],
      [
       "тексты",
       "нормализация, токенизация (BPE), паддинг и маски; аугментации — синонимы, EDA, back-translation"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Домашнее задание к главе появится позже. Проверь себя: сможешь ли ты объяснить, почему гейт забывания LSTM решает проблему затухания градиента, а beam search находит фразы, которые пропускает жадный поиск?"
    }
   ],
   "terms": []
  }
 ]
}
