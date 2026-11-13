// Блок ноября «Углубляемся», направление «Машинное обучение», глава 3 — Свёрточные нейросети.
// Изображения как тензоры, недостатки MLP, свёртка, padding/stride/dilation, backprop через свёртку,
// пулинг, рецептивное поле, GAP, остаточные связи, сборка CNN, регуляризация, знаковые архитектуры,
// задачи компьютерного зрения и transfer learning. Вывод примеров — настоящий (PyTorch), схемы — SVG.
// Задание к главе пока не опубликовано.

export default {
 "num": 3,
 "title": "Свёрточные нейросети",
 "summary": "Изображения как тензоры; почему полносвязная сеть не подходит для картинок; свёртка и её параметры: ядро, каналы, padding, stride, dilation; обратное распространение через свёрточный слой; max pooling, рецептивное поле, global average pooling, остаточные связи; как собрать CNN и обучить её на PyTorch; аугментации, label smoothing, mixup и CutMix; архитектуры от LeNet до EfficientNet; детекция, сегментация и transfer learning.",
 "intro": "Свёрточные сети — первая архитектура, которая учитывает структуру данных: соседство пикселей и то, что объект может оказаться в любом месте картинки. Разберём, как работает свёртка и почему она так экономна, как градиенты проходят через свёрточный слой, из каких блоков собираются современные CNN, как их регуляризовать и какие идеи принесли знаменитые архитектуры. Все примеры кода выполнены по-настоящему, а схемы показывают вычисления на конкретных числах.",
 "sections": [
  {
   "id": "data",
   "num": "3.1",
   "title": "Изображения как данные",
   "blocks": [
    {
     "t": "p",
     "text": "Изображение для компьютера — **тензор чисел**. Чёрно-белая картинка — матрица яркостей размера \\(H \\times W\\), цветная — три такие матрицы, по одной на канал: красный, зелёный и синий (RGB). Значения обычно от 0 до 255, а перед подачей в сеть их делят на 255 и нормируют: вычитают среднее и делят на стандартное отклонение по каждому каналу."
    },
    {
     "t": "table",
     "caption": "Таблица 1. Размерности в задачах с изображениями",
     "headers": [
      "Объект",
      "Форма тензора в PyTorch",
      "Пример"
     ],
     "rows": [
      [
       "одна цветная картинка",
       "`C × H × W`",
       "3 × 224 × 224"
      ],
      [
       "батч картинок",
       "`N × C × H × W`",
       "64 × 3 × 224 × 224"
      ],
      [
       "карта признаков после свёртки",
       "`N × C_out × H_out × W_out`",
       "64 × 128 × 56 × 56"
      ],
      [
       "видео",
       "`N × C × T × H × W`",
       "T — число кадров"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Порядок осей «каналы перед высотой и шириной» (NCHW) — соглашение PyTorch; в TensorFlow по умолчанию NHWC. Путаница осей — частая ошибка при переносе кода и при отображении картинок через matplotlib, который ждёт H × W × C."
    },
    {
     "t": "p",
     "text": "Классическая задача — **классификация изображений**: определить, что на картинке. Эталонный набор ImageNet содержит около 1,2 млн обучающих фотографий 1000 классов; на нём выросли почти все архитектуры из этой главы."
    }
   ],
   "terms": [
    [
     "канал",
     "отдельная матрица значений: R, G, B у входа или признак у карты признаков."
    ],
    [
     "NCHW",
     "порядок осей: батч, каналы, высота, ширина."
    ]
   ]
  },
  {
   "id": "why-not-mlp",
   "num": "3.2",
   "title": "Почему полносвязная сеть плохо подходит для картинок",
   "blocks": [
    {
     "t": "p",
     "text": "Картинку можно вытянуть в вектор и подать в многослойный перцептрон из главы 2. Технически это работает, но у такого подхода два принципиальных недостатка."
    },
    {
     "t": "h3",
     "text": "3.2.1. Слишком много параметров"
    },
    {
     "t": "p",
     "text": "Вход 224 × 224 × 3 — это 150 528 чисел. Один полносвязный слой на 1000 нейронов содержит 150 528 × 1000 ≈ **150 миллионов** весов — больше, чем вся сеть ResNet-50 (около 25 млн). Такую модель долго обучать, её трудно хранить, и она легко переобучается."
    },
    {
     "t": "code",
     "text": "H, W, C = 224, 224, 3\ndense = H * W * C * 1000 + 1000          # полносвязный слой на 1000 нейронов\nconv = 3 * 3 * C * 64 + 64               # свёрточный слой: 64 фильтра 3×3\nprint(f'полносвязный слой: {dense:,} параметров'.replace(',', ' '))\nprint(f'свёрточный слой:   {conv:,} параметров'.replace(',', ' '))\nprint(f'разница: в {dense // conv:,} раз'.replace(',', ' '))",
     "out": "полносвязный слой: 150 529 000 параметров\nсвёрточный слой:   1 792 параметров\nразница: в 84 000 раз"
    },
    {
     "t": "h3",
     "text": "3.2.2. Структура данных никак не учитывается"
    },
    {
     "t": "ul",
     "items": [
      "**Соседство пикселей теряется.** Перцептрону всё равно, в каком порядке идут входы: если одинаково перемешать пиксели у всех картинок, он обучится так же. А ведь смысл изображения — в локальных узорах: соседние пиксели образуют края, края — текстуры, текстуры — части объектов.",
      "**Нет устойчивости к сдвигу.** Кошка в левом верхнем углу и кошка в правом нижнем для перцептрона — совершенно разные входы, и ему придётся отдельно учиться узнавать кошку в каждой позиции. Это требует огромного количества данных."
     ]
    },
    {
     "t": "p",
     "text": "Свёрточные сети решают обе проблемы двумя идеями: **локальность** (нейрон смотрит только на небольшой участок) и **разделение весов** (один и тот же детектор применяется во всех позициях картинки)."
    }
   ],
   "terms": []
  },
  {
   "id": "conv",
   "num": "3.3",
   "title": "Свёртка",
   "blocks": [
    {
     "t": "h3",
     "text": "3.3.1. Идея"
    },
    {
     "t": "p",
     "text": "Возьмём маленькую матрицу весов — **ядро** (kernel, фильтр), например 3 × 3. Приложим её к левому верхнему углу картинки, перемножим совпавшие числа поэлементно и сложим — получим одно число. Сдвинем ядро на один пиксель вправо и повторим. Пройдя ядром всю картинку, получим новую матрицу — **карту признаков** (feature map). Её значение в каждой точке показывает, насколько участок картинки вокруг этой точки похож на узор ядра."
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 520 312\" role=\"img\" aria-label=\"Свёртка: окно 3 на 3 скользит по входу 5 на 5, сумма поэлементных произведений с ядром даёт одно число выхода\"><text x=\"100\" y=\"28\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">вход 5 × 5</text><rect x=\"20\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"36\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"52\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"52\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"68\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"84\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"84\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"100\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"116\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"116\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"132\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"148\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"148\" y=\"44\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"164\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"20\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"36\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"52\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"52\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"68\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"84\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"84\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"100\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"116\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"116\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"132\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"148\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"148\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"164\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"20\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"36\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"52\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"52\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"68\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"84\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"84\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"100\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"116\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"116\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"132\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"148\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"148\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"164\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"20\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"36\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"52\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"52\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"68\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"84\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"84\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"100\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"116\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"116\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"132\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"148\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"148\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"164\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"20\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"36\" y=\"188\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"52\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"52\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"68\" y=\"188\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"84\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"84\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"100\" y=\"188\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">3</text><rect x=\"116\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"116\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"132\" y=\"188\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"148\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"148\" y=\"172\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.08\" stroke=\"#58A6FF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"164\" y=\"188\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><text x=\"212\" y=\"124\" font-size=\"24\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">∗</text><text x=\"282\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">ядро 3 × 3</text><rect x=\"234\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"234\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"250\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">1</text><rect x=\"266\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"266\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"282\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"298\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"298\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"314\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">−1</text><rect x=\"234\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"234\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"250\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">1</text><rect x=\"266\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"266\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"282\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"298\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"298\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"314\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">−1</text><rect x=\"234\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"234\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"250\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">1</text><rect x=\"266\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"266\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"282\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"298\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"298\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.08\" stroke=\"#BC8CFF\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"314\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">−1</text><text x=\"354\" y=\"124\" font-size=\"22\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">=</text><text x=\"424\" y=\"60\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">выход 3 × 3</text><rect x=\"376\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"376\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.28\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"392\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"408\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"408\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"424\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">9</text><rect x=\"440\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"440\" y=\"76\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"456\" y=\"92\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">9</text><rect x=\"376\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"376\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"392\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"408\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"408\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"424\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">9</text><rect x=\"440\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"440\" y=\"108\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"456\" y=\"124\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">9</text><rect x=\"376\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"376\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"392\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">0</text><rect x=\"408\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"408\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"424\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">9</text><rect x=\"440\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" class=\"dg-bg\"/><rect x=\"440\" y=\"140\" width=\"32\" height=\"32\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.08\" stroke=\"#3FB950\" stroke-width=\"1\" stroke-opacity=\"0.45\"/><text x=\"456\" y=\"156\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">9</text><text x=\"20\" y=\"232\" font-size=\"12.5\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"currentColor\">Левая верхняя клетка выхода — окно, подсвеченное на входе:</text><text x=\"20\" y=\"254\" font-size=\"12.5\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"#FF8C42\">3·1 + 3·0 + 3·(−1) + 3·1 + 3·0 + 3·(−1) + 3·1 + 3·0 + 3·(−1) = 0</text><text x=\"20\" y=\"276\" font-size=\"12.5\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"currentColor\">Там, где окно накрывает границу «светлое → тёмное», выход равен 9:</text><text x=\"20\" y=\"298\" font-size=\"12.5\" text-anchor=\"start\" dominant-baseline=\"central\" fill=\"currentColor\">ядро нашло вертикальный край</text></svg>",
     "caption": "Ядро [1 0 −1] по столбцам — детектор вертикальных краёв: на однородных участках ответ 0, на границе яркости — большое число",
     "width": 520
    },
    {
     "t": "h3",
     "text": "3.3.2. Формальное определение"
    },
    {
     "t": "p",
     "text": "Для входа \\(X\\) и ядра \\(K\\) размера \\(k \\times k\\) значение выхода в точке \\((i, j)\\):"
    },
    {
     "t": "tex",
     "rows": [
      [
       "свёртка",
       "Y_{i,j} = \\sum_{u=0}^{k-1}\\sum_{v=0}^{k-1} K_{u,v}\\, X_{i+u,\\, j+v} + b"
      ]
     ]
    },
    {
     "t": "note",
     "text": "В математике у свёртки ядро ещё и **переворачивается**; то, что считают нейросети, строго говоря называется **взаимной корреляцией**. Для обучения разницы нет: ядро всё равно обучается, и сеть сама выучит его «перевёрнутым». Но на собеседовании этот нюанс любят спросить."
    },
    {
     "t": "code",
     "text": "import numpy as np\nimport torch\nimport torch.nn.functional as F\n\nX = np.array([[3, 3, 3, 0, 0]] * 5, dtype=float)     # светлая левая часть, тёмная правая\nK = np.array([[1, 0, -1]] * 3, dtype=float)          # детектор вертикального края\n\nmanual = np.array([[(X[i:i+3, j:j+3] * K).sum() for j in range(3)] for i in range(3)])\ntorch_out = F.conv2d(torch.tensor(X)[None, None], torch.tensor(K)[None, None])\nprint('вручную:\\n', manual)\nprint('torch.conv2d совпадает:', np.allclose(manual, torch_out[0, 0].numpy()))",
     "out": "вручную:\n [[0. 9. 9.]\n [0. 9. 9.]\n [0. 9. 9.]]\ntorch.conv2d совпадает: True"
    },
    {
     "t": "h3",
     "text": "3.3.3. Ядра — это детекторы признаков"
    },
    {
     "t": "p",
     "text": "Классическое компьютерное зрение подбирало ядра вручную. Свёрточная сеть делает то же самое, но **учит** значения ядер градиентным спуском. Первые слои обученной сети почти всегда выучивают ядра, похожие на ручные: детекторы краёв разной ориентации, цветовых пятен и простых текстур."
    },
    {
     "t": "table",
     "caption": "Таблица 2. Известные «ручные» ядра 3 × 3",
     "headers": [
      "Ядро",
      "Веса",
      "Что делает"
     ],
     "rows": [
      [
       "размытие (box blur)",
       "все 1/9",
       "усредняет окрестность, убирает шум"
      ],
      [
       "вертикальный край (Собель)",
       "`[1 0 −1; 2 0 −2; 1 0 −1]`",
       "реагирует на изменение яркости слева направо"
      ],
      [
       "горизонтальный край",
       "то же, транспонированное",
       "реагирует на изменение яркости сверху вниз"
      ],
      [
       "повышение резкости",
       "`[0 −1 0; −1 5 −1; 0 −1 0]`",
       "усиливает отличие пикселя от соседей"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "3.3.4. Несколько каналов на входе и выходе"
    },
    {
     "t": "p",
     "text": "У цветной картинки 3 канала, у карты признаков в середине сети — десятки и сотни. Поэтому ядро на самом деле трёхмерное: \\(C_{in} \\times k \\times k\\) — оно проходит по всем входным каналам сразу и суммирует результаты. Один такой фильтр даёт один выходной канал. Свёрточный слой содержит \\(C_{out}\\) фильтров и выдаёт \\(C_{out}\\) каналов."
    },
    {
     "t": "tex",
     "rows": [
      [
       "параметры слоя",
       "C_{out} \\cdot (C_{in} \\cdot k \\cdot k + 1)"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Важно: число параметров **не зависит от размера картинки** — одни и те же фильтры применяются и к 32 × 32, и к 1024 × 1024. Это и есть разделение весов."
    },
    {
     "t": "h3",
     "text": "3.3.5. Padding, stride, dilation"
    },
    {
     "t": "ul",
     "items": [
      "**Padding** — дополнение входа по краям (обычно нулями). Без него выход меньше входа на \\(k - 1\\) и края картинки участвуют в меньшем числе окон. Padding = 1 для ядра 3 × 3 сохраняет размер.",
      "**Stride** — шаг сдвига окна. Stride 2 уменьшает выход примерно вдвое по каждой стороне — так сеть уменьшает разрешение без пулинга.",
      "**Dilation** — «разреженное» ядро с пропусками между весами: ядро 3 × 3 с dilation 2 покрывает область 5 × 5 при тех же 9 весах. Используется в сегментации, чтобы видеть больше контекста."
     ]
    },
    {
     "t": "tex",
     "rows": [
      [
       "размер выхода",
       "H_{out} = \\left\\lfloor \\frac{H_{in} + 2p - d\\,(k - 1) - 1}{s} \\right\\rfloor + 1"
      ]
     ]
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\n\nx = torch.randn(1, 3, 32, 32)\nfor kw in [dict(), dict(padding=1), dict(padding=1, stride=2), dict(padding=2, dilation=2)]:\n    conv = nn.Conv2d(3, 16, kernel_size=3, **kw)\n    print(f'{str(kw):35s} → {tuple(conv(x).shape)}')",
     "out": "{}                                  → (1, 16, 30, 30)\n{'padding': 1}                      → (1, 16, 32, 32)\n{'padding': 1, 'stride': 2}         → (1, 16, 16, 16)\n{'padding': 2, 'dilation': 2}       → (1, 16, 32, 32)"
    },
    {
     "t": "h3",
     "text": "3.3.6. Свёртки не только для изображений"
    },
    {
     "t": "table",
     "caption": "Таблица 3. Свёртки разной размерности",
     "headers": [
      "Свёртка",
      "Ядро скользит по",
      "Данные"
     ],
     "rows": [
      [
       "1D (`Conv1d`)",
       "одной оси — времени",
       "звук, временные ряды, последовательности символов"
      ],
      [
       "2D (`Conv2d`)",
       "высоте и ширине",
       "изображения, спектрограммы"
      ],
      [
       "3D (`Conv3d`)",
       "времени, высоте и ширине или трём осям объёма",
       "видео, медицинские снимки КТ и МРТ"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "3.3.7. Сдвиг, поворот, масштаб"
    },
    {
     "t": "p",
     "text": "Свёртка **эквивариантна к сдвигу**: если сдвинуть вход, карта признаков сдвинется так же. Это ровно то свойство, которого не хватало перцептрону. А вот к **повороту, отражению и изменению масштаба** свёртка сама по себе не устойчива: ядро вертикального края не сработает на горизонтальном крае. Эту устойчивость сеть получает из данных — поэтому так важны аугментации (раздел 3.8)."
    }
   ],
   "terms": [
    [
     "ядро (фильтр)",
     "маленькая обучаемая матрица весов, которая скользит по входу."
    ],
    [
     "карта признаков",
     "результат применения фильтра ко всем позициям входа."
    ],
    [
     "padding",
     "дополнение входа по краям."
    ],
    [
     "stride",
     "шаг сдвига окна свёртки."
    ],
    [
     "эквивариантность",
     "сдвиг входа приводит к такому же сдвигу выхода."
    ]
   ]
  },
  {
   "id": "conv-backprop",
   "num": "3.4",
   "title": "Свёрточный слой и обратное распространение ошибки",
   "blocks": [
    {
     "t": "p",
     "text": "Свёрточный слой — по сути линейный слой с особой структурой: многие веса матрицы равны нулю (локальность), а остальные **повторяются** (разделение весов). Поэтому обратный проход строится по тем же правилам, что в главе 2, с одной поправкой: если вес использовался во многих позициях, его градиент — **сумма** вкладов от всех позиций."
    },
    {
     "t": "tex",
     "rows": [
      [
       "по ядру",
       "\\frac{\\partial L}{\\partial K_{u,v}} = \\sum_{i,j} \\frac{\\partial L}{\\partial Y_{i,j}}\\, X_{i+u,\\, j+v}"
      ],
      [
       "по смещению",
       "\\frac{\\partial L}{\\partial b} = \\sum_{i,j} \\frac{\\partial L}{\\partial Y_{i,j}}"
      ],
      [
       "по входу",
       "\\frac{\\partial L}{\\partial X_{m,n}} = \\sum_{u,v} \\frac{\\partial L}{\\partial Y_{m-u,\\, n-v}}\\, K_{u,v}"
      ]
     ]
    },
    {
     "t": "ul",
     "items": [
      "Градиент по ядру — это **свёртка входа с градиентом выхода**: та же операция, что на прямом проходе, только вместо ядра — матрица \\(\\partial L / \\partial Y\\).",
      "Градиент по входу — свёртка градиента выхода с **перевёрнутым** ядром и дополнением нулями по краям («полная» свёртка). Каждый пиксель входа влиял на несколько выходов — и собирает градиент от каждого.",
      "В общем случае с несколькими каналами формулы те же, добавляется суммирование по каналам."
     ]
    },
    {
     "t": "code",
     "text": "import numpy as np\nimport torch\nimport torch.nn.functional as F\n\nrng = np.random.default_rng(1)\nX = rng.normal(size=(6, 6)); K = rng.normal(size=(3, 3)); G = rng.normal(size=(4, 4))  # G = ∂L/∂Y\n\n# вручную по формулам\ndK = np.array([[(G * X[u:u+4, v:v+4]).sum() for v in range(3)] for u in range(3)])\ndX = np.zeros_like(X)\nfor i in range(4):\n    for j in range(4):\n        dX[i:i+3, j:j+3] += G[i, j] * K          # каждый выход раздаёт градиент своему окну\n\n# autograd\ntX = torch.tensor(X, requires_grad=True); tK = torch.tensor(K, requires_grad=True)\nY = F.conv2d(tX[None, None], tK[None, None])[0, 0]\n(Y * torch.tensor(G)).sum().backward()           # тогда ∂L/∂Y = G\nprint('∂L/∂K совпадает:', np.allclose(dK, tK.grad.numpy()))\nprint('∂L/∂X совпадает:', np.allclose(dX, tX.grad.numpy()))",
     "out": "∂L/∂K совпадает: True\n∂L/∂X совпадает: True"
    }
   ],
   "terms": [
    [
     "разделение весов",
     "один и тот же фильтр применяется во всех позициях — его градиенты суммируются."
    ]
   ]
  },
  {
   "id": "blocks",
   "num": "3.5",
   "title": "Пулинг, рецептивное поле и остаточные связи",
   "blocks": [
    {
     "t": "h3",
     "text": "3.5.1. Max pooling"
    },
    {
     "t": "p",
     "text": "**Пулинг** уменьшает карту признаков: окно (обычно 2 × 2 с шагом 2) заменяется одним числом — максимумом (max pooling) или средним (average pooling). Обучаемых параметров нет. Max pooling отвечает на вопрос «встретился ли признак где-то в этом окне», делая сеть чуть устойчивее к маленьким сдвигам и вдвое уменьшая вычисления в следующих слоях."
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 440 240\" role=\"img\" aria-label=\"Max pooling 2 на 2 с шагом 2: из каждого квадрата 2 на 2 берётся максимум\"><text x=\"100\" y=\"22\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">вход 4 × 4</text><rect x=\"20\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.1\" stroke=\"#58A6FF\" stroke-width=\"1.2\"/><text x=\"40\" y=\"60\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">1</text><rect x=\"60\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"60\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.1\" stroke=\"#58A6FF\" stroke-width=\"1.2\"/><text x=\"80\" y=\"60\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">3</text><rect x=\"100\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"100\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.1\" stroke=\"#FF8C42\" stroke-width=\"1.2\"/><text x=\"120\" y=\"60\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">2</text><rect x=\"140\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"40\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.1\" stroke=\"#FF8C42\" stroke-width=\"1.2\"/><text x=\"160\" y=\"60\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">0</text><rect x=\"20\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.42\" stroke=\"#58A6FF\" stroke-width=\"1.2\"/><text x=\"40\" y=\"100\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">4</text><rect x=\"60\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"60\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.1\" stroke=\"#58A6FF\" stroke-width=\"1.2\"/><text x=\"80\" y=\"100\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">2</text><rect x=\"100\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"100\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.1\" stroke=\"#FF8C42\" stroke-width=\"1.2\"/><text x=\"120\" y=\"100\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">1</text><rect x=\"140\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.42\" stroke=\"#FF8C42\" stroke-width=\"1.2\"/><text x=\"160\" y=\"100\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">5</text><rect x=\"20\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.1\" stroke=\"#3FB950\" stroke-width=\"1.2\"/><text x=\"40\" y=\"140\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">0</text><rect x=\"60\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"60\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.1\" stroke=\"#3FB950\" stroke-width=\"1.2\"/><text x=\"80\" y=\"140\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">1</text><rect x=\"100\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"100\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.42\" stroke=\"#BC8CFF\" stroke-width=\"1.2\"/><text x=\"120\" y=\"140\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">3</text><rect x=\"140\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.1\" stroke=\"#BC8CFF\" stroke-width=\"1.2\"/><text x=\"160\" y=\"140\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">2</text><rect x=\"20\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"20\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.1\" stroke=\"#3FB950\" stroke-width=\"1.2\"/><text x=\"40\" y=\"180\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">2</text><rect x=\"60\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"60\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.42\" stroke=\"#3FB950\" stroke-width=\"1.2\"/><text x=\"80\" y=\"180\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">6</text><rect x=\"100\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"100\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.1\" stroke=\"#BC8CFF\" stroke-width=\"1.2\"/><text x=\"120\" y=\"180\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">1</text><rect x=\"140\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"140\" y=\"160\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.1\" stroke=\"#BC8CFF\" stroke-width=\"1.2\"/><text x=\"160\" y=\"180\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"400\">1</text><line x1=\"196\" y1=\"120\" x2=\"259.7\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"266.0,120.0 259.6,122.9 259.6,117.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"231\" y=\"104\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">max</text><text x=\"320\" y=\"62\" font-size=\"13\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"600\">выход 2 × 2</text><rect x=\"280\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"280\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#58A6FF\" fill-opacity=\"0.42\" stroke=\"#58A6FF\" stroke-width=\"1.2\"/><text x=\"300\" y=\"100\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">4</text><rect x=\"320\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"320\" y=\"80\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#FF8C42\" fill-opacity=\"0.42\" stroke=\"#FF8C42\" stroke-width=\"1.2\"/><text x=\"340\" y=\"100\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">5</text><rect x=\"280\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"280\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#3FB950\" fill-opacity=\"0.42\" stroke=\"#3FB950\" stroke-width=\"1.2\"/><text x=\"300\" y=\"140\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">6</text><rect x=\"320\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" class=\"dg-bg\"/><rect x=\"320\" y=\"120\" width=\"40\" height=\"40\" rx=\"0\" fill=\"#BC8CFF\" fill-opacity=\"0.42\" stroke=\"#BC8CFF\" stroke-width=\"1.2\"/><text x=\"340\" y=\"140\" font-size=\"14\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-weight=\"700\">3</text><text x=\"220\" y=\"224\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">каждый цвет — своё окно 2 × 2; максимум окна выделен</text></svg>",
     "caption": "Пулинг уменьшает карту признаков вдвое по каждой стороне и не имеет обучаемых параметров",
     "width": 440
    },
    {
     "t": "p",
     "text": "Обратный проход через max pooling простой: градиент целиком уходит в ту позицию, где был максимум, остальным позициям окна достаётся ноль."
    },
    {
     "t": "h3",
     "text": "3.5.2. Рецептивное поле"
    },
    {
     "t": "p",
     "text": "**Рецептивное поле** нейрона — участок исходной картинки, от которого зависит его значение. У нейрона первого слоя с ядром 3 × 3 оно 3 × 3. Две свёртки 3 × 3 подряд «видят» 5 × 5, три — 7 × 7. Пулинг и stride 2 увеличивают поле быстрее — каждый следующий слой смотрит на вдвое более крупный масштаб. Поэтому глубокие слои реагируют уже на целые объекты: их рецептивное поле сравнимо с размером картинки."
    },
    {
     "t": "h3",
     "text": "3.5.3. Global average pooling"
    },
    {
     "t": "p",
     "text": "В конце сети карта признаков размера \\(C \\times h \\times w\\) нужно превратить в вектор для классификатора. Раньше её просто вытягивали в вектор и ставили большие полносвязные слои (в AlexNet и VGG на них приходилась большая часть параметров). **Global average pooling** (GAP) усредняет каждый канал по всей площади и даёт вектор длины \\(C\\): каждый канал — «насколько на картинке есть признак номер c». Параметров ноль, и сеть работает с картинками любого размера."
    },
    {
     "t": "h3",
     "text": "3.5.4. Остаточные связи"
    },
    {
     "t": "p",
     "text": "Казалось бы, чем глубже сеть, тем лучше. Но в 2015 году заметили странное: сеть из 56 слоёв обучалась **хуже** сети из 20 слоёв даже на обучающей выборке — проблема оптимизации, а не переобучения. Решение предложила архитектура ResNet: **остаточная связь** (residual connection, skip connection) прибавляет вход блока к его выходу."
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 600 190\" role=\"img\" aria-label=\"Остаточный блок: выход двух свёрток складывается с входом блока\"><rect x=\"14\" y=\"100\" width=\"56\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"14\" y=\"100\" width=\"56\" height=\"40\" rx=\"8\" fill=\"#58A6FF\" fill-opacity=\"0.14\" stroke=\"#58A6FF\" stroke-width=\"1.5\"/><text x=\"42\" y=\"120\" font-size=\"15\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#58A6FF\" font-weight=\"600\">x</text><rect x=\"110\" y=\"98\" width=\"120\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"110\" y=\"98\" width=\"120\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"170\" y=\"111\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">conv 3×3</text><text x=\"170\" y=\"129\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">BN, ReLU</text><rect x=\"264\" y=\"98\" width=\"120\" height=\"44\" rx=\"8\" class=\"dg-bg\"/><rect x=\"264\" y=\"98\" width=\"120\" height=\"44\" rx=\"8\" fill=\"#FF8C42\" fill-opacity=\"0.14\" stroke=\"#FF8C42\" stroke-width=\"1.5\"/><text x=\"324\" y=\"111\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">conv 3×3</text><text x=\"324\" y=\"129\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#FF8C42\" font-weight=\"600\">BN</text><circle cx=\"432\" cy=\"120\" r=\"18\" class=\"dg-bg\"/><circle cx=\"432\" cy=\"120\" r=\"18\" fill=\"#3FB950\" fill-opacity=\"0.16\" stroke=\"#3FB950\" stroke-width=\"1.5\"/><text x=\"432\" y=\"120\" font-size=\"18\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">+</text><rect x=\"480\" y=\"100\" width=\"104\" height=\"40\" rx=\"8\" class=\"dg-bg\"/><rect x=\"480\" y=\"100\" width=\"104\" height=\"40\" rx=\"8\" fill=\"#BC8CFF\" fill-opacity=\"0.14\" stroke=\"#BC8CFF\" stroke-width=\"1.5\"/><text x=\"532\" y=\"120\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#BC8CFF\" font-weight=\"600\">ReLU → выход</text><line x1=\"70\" y1=\"120\" x2=\"101.7\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"108.0,120.0 101.6,122.9 101.6,117.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"230\" y1=\"120\" x2=\"255.7\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"262.0,120.0 255.6,122.9 255.6,117.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"384\" y1=\"120\" x2=\"405.7\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"412.0,120.0 405.6,122.9 405.6,117.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"450\" y1=\"120\" x2=\"471.7\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"478.0,120.0 471.6,122.9 471.6,117.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><path d=\"M90 120 V40 H432 V100\" fill=\"none\" stroke=\"#3FB950\" stroke-width=\"1.8\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><polygon points=\"432,102 427,93 437,93\" fill=\"#3FB950\"/><text x=\"260\" y=\"26\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#3FB950\">короткая связь (skip connection): x передаётся без изменений</text><text x=\"248\" y=\"168\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">F(x) — то, чему учатся свёртки</text><text x=\"432\" y=\"168\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\" font-style=\"italic\">y = F(x) + x</text></svg>",
     "caption": "Остаточный блок ResNet: слоям достаточно выучить «поправку» F(x) к входу, а градиент проходит по короткой связи напрямую",
     "width": 600
    },
    {
     "t": "tex",
     "rows": [
      [
       "блок",
       "y = F(x) + x"
      ]
     ]
    },
    {
     "t": "ul",
     "items": [
      "Если блоку нечего добавить, ему достаточно выучить \\(F(x) = 0\\) — это проще, чем выучить тождественное отображение через несколько нелинейных слоёв. Поэтому добавление слоёв не ухудшает сеть.",
      "Производная \\(y\\) по \\(x\\) равна \\(\\partial F / \\partial x + I\\): градиент всегда может пройти через единичное слагаемое напрямую, не затухая. Это позволило обучать сети из 100–1000 слоёв.",
      "Остаточные связи есть почти во всех современных архитектурах — включая трансформеры из главы 5."
     ]
    }
   ],
   "terms": [
    [
     "пулинг",
     "уменьшение карты признаков заменой окна на максимум или среднее."
    ],
    [
     "рецептивное поле",
     "область входа, влияющая на значение нейрона."
    ],
    [
     "GAP",
     "global average pooling — среднее каждого канала по всей карте."
    ],
    [
     "residual connection",
     "остаточная связь y = F(x) + x."
    ]
   ]
  },
  {
   "id": "architecture",
   "num": "3.6",
   "title": "Как собрать свёрточную сеть",
   "blocks": [
    {
     "t": "p",
     "text": "Большинство классификационных CNN устроены по одной схеме: несколько **стадий**, в каждой — пара блоков «свёртка → нормализация → активация», затем уменьшение разрешения. От стадии к стадии пространственный размер уменьшается вдвое, а число каналов удваивается: сеть меняет «где» на «что». В конце — глобальный пулинг и линейный слой на число классов."
    },
    {
     "t": "svg",
     "svg": "<svg class=\"plot-svg\" viewBox=\"0 0 660 250\" role=\"img\" aria-label=\"Типичная свёрточная сеть: пространственный размер уменьшается, число каналов растёт, в конце глобальный пулинг и линейный слой\"><rect x=\"14\" y=\"40\" width=\"26\" height=\"128\" rx=\"3\" class=\"dg-bg\"/><rect x=\"14\" y=\"40\" width=\"26\" height=\"128\" rx=\"3\" fill=\"#58A6FF\" fill-opacity=\"0.2\" stroke=\"#58A6FF\" stroke-width=\"1.4\"/><text x=\"27\" y=\"196\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">вход</text><text x=\"27\" y=\"216\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">1×28×28</text><rect x=\"108\" y=\"30\" width=\"44\" height=\"128\" rx=\"3\" class=\"dg-bg\"/><rect x=\"108\" y=\"30\" width=\"44\" height=\"128\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.06\" stroke=\"#FF8C42\" stroke-width=\"1\"/><rect x=\"103\" y=\"35\" width=\"44\" height=\"128\" rx=\"3\" class=\"dg-bg\"/><rect x=\"103\" y=\"35\" width=\"44\" height=\"128\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.06\" stroke=\"#FF8C42\" stroke-width=\"1\"/><rect x=\"98\" y=\"40\" width=\"44\" height=\"128\" rx=\"3\" class=\"dg-bg\"/><rect x=\"98\" y=\"40\" width=\"44\" height=\"128\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.2\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"120\" y=\"196\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">conv-bn-relu</text><text x=\"120\" y=\"216\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">32×28×28</text><rect x=\"206\" y=\"57\" width=\"44\" height=\"74\" rx=\"3\" class=\"dg-bg\"/><rect x=\"206\" y=\"57\" width=\"44\" height=\"74\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.06\" stroke=\"#FF8C42\" stroke-width=\"1\"/><rect x=\"201\" y=\"62\" width=\"44\" height=\"74\" rx=\"3\" class=\"dg-bg\"/><rect x=\"201\" y=\"62\" width=\"44\" height=\"74\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.06\" stroke=\"#FF8C42\" stroke-width=\"1\"/><rect x=\"196\" y=\"67\" width=\"44\" height=\"74\" rx=\"3\" class=\"dg-bg\"/><rect x=\"196\" y=\"67\" width=\"44\" height=\"74\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.2\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"218\" y=\"196\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">conv-bn-relu</text><text x=\"218\" y=\"216\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">64×14×14</text><rect x=\"304\" y=\"74\" width=\"56\" height=\"40\" rx=\"3\" class=\"dg-bg\"/><rect x=\"304\" y=\"74\" width=\"56\" height=\"40\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.06\" stroke=\"#FF8C42\" stroke-width=\"1\"/><rect x=\"299\" y=\"79\" width=\"56\" height=\"40\" rx=\"3\" class=\"dg-bg\"/><rect x=\"299\" y=\"79\" width=\"56\" height=\"40\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.06\" stroke=\"#FF8C42\" stroke-width=\"1\"/><rect x=\"294\" y=\"84\" width=\"56\" height=\"40\" rx=\"3\" class=\"dg-bg\"/><rect x=\"294\" y=\"84\" width=\"56\" height=\"40\" rx=\"3\" fill=\"#FF8C42\" fill-opacity=\"0.2\" stroke=\"#FF8C42\" stroke-width=\"1.4\"/><text x=\"322\" y=\"196\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">conv-bn-relu</text><text x=\"322\" y=\"216\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">128×7×7</text><rect x=\"406\" y=\"95\" width=\"56\" height=\"18\" rx=\"3\" class=\"dg-bg\"/><rect x=\"406\" y=\"95\" width=\"56\" height=\"18\" rx=\"3\" fill=\"#3FB950\" fill-opacity=\"0.2\" stroke=\"#3FB950\" stroke-width=\"1.4\"/><text x=\"434\" y=\"196\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">GAP</text><text x=\"434\" y=\"216\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">128</text><rect x=\"530\" y=\"95\" width=\"40\" height=\"18\" rx=\"3\" class=\"dg-bg\"/><rect x=\"530\" y=\"95\" width=\"40\" height=\"18\" rx=\"3\" fill=\"#BC8CFF\" fill-opacity=\"0.2\" stroke=\"#BC8CFF\" stroke-width=\"1.4\"/><text x=\"550\" y=\"196\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" class=\"dg-strong\">linear</text><text x=\"550\" y=\"216\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\">10 классов</text><line x1=\"42\" y1=\"104\" x2=\"89.7\" y2=\"104\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"96.0,104.0 89.6,106.9 89.6,101.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"154\" y1=\"104\" x2=\"187.7\" y2=\"104\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"194.0,104.0 187.6,106.9 187.6,101.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"252\" y1=\"104\" x2=\"285.7\" y2=\"104\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"292.0,104.0 285.6,106.9 285.6,101.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"362\" y1=\"104\" x2=\"397.7\" y2=\"104\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"404.0,104.0 397.6,106.9 397.6,101.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><line x1=\"474\" y1=\"104\" x2=\"521.7\" y2=\"104\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-opacity=\"0.75\" stroke-linecap=\"round\"/><polygon points=\"528.0,104.0 521.6,106.9 521.6,101.1\" fill=\"currentColor\" fill-opacity=\"0.75\"/><text x=\"330\" y=\"18\" font-size=\"12\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"currentColor\" fill-opacity=\"0.85\">слева направо: карта признаков всё меньше, каналов всё больше</text></svg>",
     "caption": "Архитектура из примера в разделе 3.6: каждый пулинг вдвое уменьшает сторону карты признаков, а число каналов удваивается; глобальный пулинг превращает карту в вектор",
     "width": 660
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\n\ndef block(c_in, c_out):\n    return nn.Sequential(nn.Conv2d(c_in, c_out, 3, padding=1, bias=False),\n                         nn.BatchNorm2d(c_out), nn.ReLU())\n\nmodel = nn.Sequential(\n    block(1, 32),                       # 32×28×28\n    nn.MaxPool2d(2), block(32, 64),     # 64×14×14\n    nn.MaxPool2d(2), block(64, 128),    # 128×7×7\n    nn.AdaptiveAvgPool2d(1), nn.Flatten(),   # global average pooling → 128\n    nn.Linear(128, 10),\n)\nx = torch.randn(8, 1, 28, 28)\nfor layer in model:\n    x = layer(x)\n    print(f'{layer.__class__.__name__:18s} → {tuple(x.shape)}')\nprint('параметров:', sum(p.numel() for p in model.parameters()))",
     "out": "Sequential         → (8, 32, 28, 28)\nMaxPool2d          → (8, 32, 14, 14)\nSequential         → (8, 64, 14, 14)\nMaxPool2d          → (8, 64, 7, 7)\nSequential         → (8, 128, 7, 7)\nAdaptiveAvgPool2d  → (8, 128, 1, 1)\nFlatten            → (8, 128)\nLinear             → (8, 10)\nпараметров: 94186"
    },
    {
     "t": "note",
     "text": "У свёртки перед BatchNorm смещение отключают (`bias=False`): batchnorm всё равно вычитает среднее, и смещение свёртки было бы лишним параметром — его роль выполняет сдвиг β в batchnorm."
    },
    {
     "t": "table",
     "caption": "Таблица 4. Практические правила",
     "headers": [
      "Правило",
      "Почему"
     ],
     "rows": [
      [
       "ядра 3 × 3, а не 5 × 5 или 7 × 7",
       "две свёртки 3 × 3 видят как одна 5 × 5, но у них 18 весов вместо 25 и две нелинейности вместо одной"
      ],
      [
       "conv → BN → ReLU",
       "стабильное и быстрое обучение"
      ],
      [
       "уменьшение разрешения — pooling или свёртка со stride 2",
       "увеличивает рецептивное поле и экономит вычисления"
      ],
      [
       "×2 каналов при ÷2 разрешения",
       "вычислительная стоимость стадий остаётся примерно одинаковой"
      ],
      [
       "GAP вместо больших полносвязных слоёв",
       "меньше параметров, любой размер входа"
      ],
      [
       "остаточные связи при глубине больше 10–20 слоёв",
       "иначе глубокая сеть плохо обучается"
      ]
     ]
    }
   ],
   "terms": [
    [
     "стадия",
     "группа блоков с одинаковым разрешением карты признаков."
    ]
   ]
  },
  {
   "id": "practice",
   "num": "3.7",
   "title": "Практика: CNN на рукописных цифрах",
   "blocks": [
    {
     "t": "p",
     "text": "Обучим маленькую свёрточную сеть на наборе рукописных цифр из scikit-learn: 1797 картинок 8 × 8. Для сравнения обучим перцептрон почти с тем же числом параметров и тем же числом эпох. Весь пример выполняется на процессоре за секунды."
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\n\ntorch.manual_seed(0)\nX, y = load_digits(return_X_y=True)\nX = torch.tensor(X / 16, dtype=torch.float32).reshape(-1, 1, 8, 8)\ny = torch.tensor(y)\nXtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)\n\ndef train(model, epochs=30):\n    opt = torch.optim.Adam(model.parameters(), lr=3e-3)\n    for _ in range(epochs):\n        model.train()\n        for idx in torch.randperm(len(Xtr)).split(64):\n            opt.zero_grad()\n            nn.functional.cross_entropy(model(Xtr[idx]), ytr[idx]).backward()\n            opt.step()\n    model.eval()\n    with torch.no_grad():\n        return (model(Xte).argmax(1) == yte).float().mean().item()\n\ncnn = nn.Sequential(\n    nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(),                      # 16×8×8\n    nn.Conv2d(16, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),    # 16×4×4\n    nn.Flatten(), nn.Linear(16 * 4 * 4, 10))  # карта 4×4 маленькая: положение штрихов важно, поэтому без GAP\nmlp = nn.Sequential(nn.Flatten(), nn.Linear(64, 64), nn.ReLU(), nn.Linear(64, 10))\n\nfor name, m in [('CNN', cnn), ('MLP', mlp)]:\n    n = sum(p.numel() for p in m.parameters())\n    print(f'{name}: {n} параметров, accuracy на тесте {train(m):.3f}')",
     "out": "CNN: 5050 параметров, accuracy на тесте 0.981\nMLP: 4810 параметров, accuracy на тесте 0.976"
    },
    {
     "t": "p",
     "text": "Даже на крошечных картинках 8 × 8, где структуры почти нет, свёрточная сеть при сопоставимом числе параметров ошибается реже. С ростом размера изображений разрыв становится огромным: на фотографиях 224 × 224 перцептрону не хватит никакого разумного бюджета параметров, а CNN обходится несколькими миллионами."
    }
   ],
   "terms": []
  },
  {
   "id": "regularization",
   "num": "3.8",
   "title": "Регуляризация свёрточных сетей",
   "blocks": [
    {
     "t": "h3",
     "text": "3.8.1. Классические приёмы"
    },
    {
     "t": "p",
     "text": "Всё из главы 2 работает и здесь: weight decay, batch normalization, ранняя остановка. Dropout в свёрточных слоях используют реже (соседние пиксели карты признаков сильно скоррелированы, и обнуление отдельных значений мало что меняет); чаще его ставят перед последним линейным слоем, а для карт признаков применяют вариант, выключающий **каналы целиком** (`Dropout2d`)."
    },
    {
     "t": "h3",
     "text": "3.8.2. Аугментации"
    },
    {
     "t": "p",
     "text": "Для изображений аугментации — самый сильный способ регуляризации. Они учат сеть устойчивости к тем преобразованиям, к которым свёртка сама по себе не устойчива."
    },
    {
     "t": "table",
     "caption": "Таблица 5. Аугментации изображений",
     "headers": [
      "Преобразование",
      "Что моделирует",
      "Осторожно"
     ],
     "rows": [
      [
       "случайная обрезка и масштаб (random resized crop)",
       "объект в разных местах и разного размера",
       "не обрезать объект целиком"
      ],
      [
       "горизонтальное отражение",
       "зеркальные снимки",
       "не для текста, цифр и дорожных знаков со стрелками"
      ],
      [
       "поворот на небольшой угол",
       "наклон камеры",
       "большие углы меняют смысл (6 и 9)"
      ],
      [
       "яркость, контраст, насыщенность (color jitter)",
       "разное освещение и камеры",
       "не там, где цвет — признак класса"
      ],
      [
       "размытие, шум, JPEG-артефакты",
       "плохое качество съёмки",
       "умеренно"
      ],
      [
       "cutout / random erasing",
       "частичное перекрытие объекта",
       "не закрывать весь объект"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Аугментации применяются **только к обучающей выборке**, причём случайно и заново на каждой эпохе. Иногда их используют и на применении (test-time augmentation): предсказания по нескольким преобразованным копиям картинки усредняют."
    },
    {
     "t": "h3",
     "text": "3.8.3. Label smoothing"
    },
    {
     "t": "p",
     "text": "При обычной кросс-энтропии целевое распределение — «1 для правильного класса, 0 для остальных», и модель стремится сделать логит правильного класса бесконечно большим. Это делает её чрезмерно уверенной. **Сглаживание меток** заменяет цель на смесь с равномерным распределением:"
    },
    {
     "t": "tex",
     "rows": [
      [
       "цель",
       "q_k = (1 - \\varepsilon)\\,[k = y] + \\frac{\\varepsilon}{K}"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "3.8.4. Mixup и CutMix"
    },
    {
     "t": "p",
     "text": "**Mixup** берёт два случайных примера и обучает модель на их взвешенной смеси — смешиваются и картинки, и метки. **CutMix** вместо смешивания пикселей вырезает прямоугольник из одной картинки и вставляет в другую, а метки смешивает пропорционально площади. Оба приёма делают границы между классами более плавными и заметно улучшают качество на больших наборах."
    },
    {
     "t": "tex",
     "rows": [
      [
       "mixup",
       "\\tilde x = \\lambda x_i + (1-\\lambda) x_j, \\quad \\tilde y = \\lambda y_i + (1-\\lambda) y_j, \\quad \\lambda \\sim \\mathrm{Beta}(\\alpha, \\alpha)"
      ]
     ]
    },
    {
     "t": "code",
     "text": "import torch\nimport torch.nn.functional as F\n\nlogits = torch.tensor([[4.0, 1.0, 0.0]])\ntarget = torch.tensor([0])\nfor eps in [0.0, 0.1, 0.3]:\n    q = torch.full((1, 3), eps / 3); q[0, 0] += 1 - eps\n    print(f'ε = {eps}: цель {q.numpy().round(3)}, потери {F.cross_entropy(logits, target, label_smoothing=eps).item():.4f}')\n\n# mixup двух объектов с метками-векторами\nx1, x2 = torch.ones(2, 2), torch.zeros(2, 2)\ny1, y2 = torch.tensor([1., 0., 0.]), torch.tensor([0., 0., 1.])\nlam = 0.7\nprint('mixup-картинка:', (lam * x1 + (1 - lam) * x2).flatten().numpy().round(2), 'метка:', (lam * y1 + (1 - lam) * y2).numpy().round(2))",
     "out": "ε = 0.0: цель [[1. 0. 0.]], потери 0.0659\nε = 0.1: цель [[0.933 0.033 0.033]], потери 0.2992\nε = 0.3: цель [[0.8 0.1 0.1]], потери 0.7659\nmixup-картинка: [0.7 0.7 0.7 0.7] метка: [0.7 0.  0.3]"
    }
   ],
   "terms": [
    [
     "аугментация",
     "случайные преобразования обучающих картинок."
    ],
    [
     "label smoothing",
     "смешивание целевой метки с равномерным распределением."
    ],
    [
     "mixup",
     "обучение на смесях пар примеров и их меток."
    ]
   ]
  },
  {
   "id": "history",
   "num": "3.9",
   "title": "Знаковые архитектуры",
   "blocks": [
    {
     "t": "p",
     "text": "История CNN — хороший конспект идей, которые сейчас используются повсюду. На собеседованиях часто просят рассказать, что нового принесла та или иная архитектура."
    },
    {
     "t": "table",
     "caption": "Таблица 6. Архитектуры классификации изображений",
     "headers": [
      "Год",
      "Архитектура",
      "Ключевая идея"
     ],
     "rows": [
      [
       "1998",
       "LeNet-5",
       "свёртки + пулинг + полносвязные слои; чтение цифр на чеках"
      ],
      [
       "2012",
       "AlexNet",
       "глубокая CNN на двух GPU, ReLU, dropout, аугментации; ошибка ImageNet снизилась с ~26% до ~15%"
      ],
      [
       "2013",
       "Network in Network",
       "свёртки 1 × 1 как «полносвязный слой по каналам»; global average pooling вместо полносвязной головы"
      ],
      [
       "2014",
       "VGG",
       "только свёртки 3 × 3, глубина 16–19 слоёв; простая и однородная архитектура"
      ],
      [
       "2014",
       "GoogLeNet (Inception)",
       "параллельные ветви с ядрами 1 × 1, 3 × 3, 5 × 5 и пулингом; свёртки 1 × 1 для сжатия каналов"
      ],
      [
       "2015",
       "Batch Normalization",
       "нормировка активаций — обучение в разы быстрее"
      ],
      [
       "2015",
       "Kaiming-инициализация",
       "правильный масштаб весов для ReLU-сетей"
      ],
      [
       "2015",
       "ResNet",
       "остаточные связи; обучение сетей из 50–150 слоёв и больше"
      ],
      [
       "2017",
       "MobileNet",
       "depthwise separable свёртки: в 8–9 раз дешевле обычных — сети для телефонов"
      ],
      [
       "2019",
       "EfficientNet",
       "согласованное масштабирование глубины, ширины и разрешения (compound scaling)"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "3.9.1. Свёртка 1 × 1"
    },
    {
     "t": "p",
     "text": "Ядро 1 × 1 не смотрит на соседей — оно смешивает **каналы** в каждой точке, как линейный слой, применённый к каждому пикселю. Так дёшево меняют число каналов: например, сжимают 256 каналов до 64 перед дорогой свёрткой 3 × 3 (bottleneck в Inception и ResNet)."
    },
    {
     "t": "h3",
     "text": "3.9.2. Depthwise separable свёртка"
    },
    {
     "t": "p",
     "text": "Обычная свёртка одновременно смотрит на соседей и смешивает каналы. MobileNet разделяет эти действия: **depthwise** свёртка 3 × 3 обрабатывает каждый канал отдельно, затем **pointwise** свёртка 1 × 1 смешивает каналы."
    },
    {
     "t": "code",
     "text": "from torch import nn\n\nc_in, c_out = 128, 256\nregular = nn.Conv2d(c_in, c_out, 3, padding=1, bias=False)\nseparable = nn.Sequential(\n    nn.Conv2d(c_in, c_in, 3, padding=1, groups=c_in, bias=False),   # depthwise: по каналу\n    nn.Conv2d(c_in, c_out, 1, bias=False))                          # pointwise: смешать каналы\ncount = lambda m: sum(p.numel() for p in m.parameters())\nprint('обычная 3×3:        ', count(regular))\nprint('depthwise separable:', count(separable))\nprint(f'экономия в {count(regular) / count(separable):.1f} раза')",
     "out": "обычная 3×3:         294912\ndepthwise separable: 33920\nэкономия в 8.7 раза"
    },
    {
     "t": "h3",
     "text": "3.9.3. Масштабирование сетей"
    },
    {
     "t": "p",
     "text": "Сеть можно увеличивать в трёх направлениях: глубже (больше слоёв), шире (больше каналов) и подавать картинки большего разрешения. EfficientNet показала, что лучше всего растить все три размера **согласованно** с фиксированными коэффициентами — так при том же бюджете вычислений получается заметно более точная модель."
    },
    {
     "t": "note",
     "text": "Сегодня для изображений широко используют и трансформеры (ViT, глава 5), и современные CNN вроде ConvNeXt, которые переняли у трансформеров удачные решения. На практике выбор между ними — вопрос данных, бюджета и требований к скорости."
    }
   ],
   "terms": [
    [
     "свёртка 1 × 1",
     "смешивает каналы в каждой точке, не глядя на соседей."
    ],
    [
     "depthwise separable",
     "поканальная свёртка 3 × 3 + свёртка 1 × 1."
    ],
    [
     "compound scaling",
     "согласованное увеличение глубины, ширины и разрешения."
    ]
   ]
  },
  {
   "id": "beyond",
   "num": "3.10",
   "title": "Не только классификация",
   "blocks": [
    {
     "t": "p",
     "text": "Обученная на ImageNet CNN — универсальный **экстрактор признаков**: её свёрточная часть (backbone) превращает картинку в информативные карты признаков. Поверх неё ставят разные «головы» под разные задачи."
    },
    {
     "t": "table",
     "caption": "Таблица 7. Задачи компьютерного зрения",
     "headers": [
      "Задача",
      "Выход",
      "Типичные модели"
     ],
     "rows": [
      [
       "классификация",
       "метка для всей картинки",
       "ResNet, EfficientNet, ViT"
      ],
      [
       "детекция объектов",
       "прямоугольники с метками и уверенностью",
       "Faster R-CNN, YOLO, DETR"
      ],
      [
       "семантическая сегментация",
       "класс каждого пикселя",
       "U-Net, DeepLab"
      ],
      [
       "сегментация экземпляров",
       "маска каждого отдельного объекта",
       "Mask R-CNN"
      ],
      [
       "ключевые точки",
       "координаты суставов, углов, ориентиров лица",
       "HRNet, OpenPose"
      ],
      [
       "поиск похожих",
       "эмбеддинг картинки",
       "CNN или ViT, обученные метрическим обучением"
      ]
     ]
    },
    {
     "t": "p",
     "text": "**Перенос обучения** (transfer learning) — главный практический приём. Берут сеть, предобученную на ImageNet, заменяют последний слой под свои классы и дообучают: сначала только новую голову, потом всю сеть с маленькой скоростью обучения. Даже нескольких сотен размеченных картинок на класс часто хватает для хорошего качества."
    },
    {
     "t": "code",
     "text": "import torch\nfrom torch import nn\nfrom torchvision.models import resnet18\n\nmodel = resnet18(weights=None)        # на практике: weights='IMAGENET1K_V1' — веса, обученные на ImageNet\nfor p in model.parameters():\n    p.requires_grad = False            # заморозить backbone\nmodel.fc = nn.Linear(model.fc.in_features, 5)   # новая голова на 5 своих классов\ntrainable = sum(p.numel() for p in model.parameters() if p.requires_grad)\ntotal = sum(p.numel() for p in model.parameters())\nprint(f'обучаемых параметров: {trainable} из {total}')\nprint('выход:', tuple(model(torch.randn(2, 3, 224, 224)).shape))",
     "out": "обучаемых параметров: 2565 из 11179077\nвыход: (2, 5)"
    }
   ],
   "terms": [
    [
     "backbone",
     "основная свёрточная часть сети, извлекающая признаки."
    ],
    [
     "голова",
     "слои поверх backbone под конкретную задачу."
    ],
    [
     "transfer learning",
     "дообучение предобученной сети на своих данных."
    ]
   ]
  },
  {
   "id": "summary",
   "num": "3.11",
   "title": "Шпаргалка",
   "blocks": [
    {
     "t": "table",
     "caption": "Таблица 8. Главное из главы",
     "headers": [
      "Тема",
      "Что запомнить"
     ],
     "rows": [
      [
       "почему не MLP",
       "слишком много параметров и нет учёта соседства и сдвигов"
      ],
      [
       "свёртка",
       "ядро скользит по входу; локальность + разделение весов; параметров C_out·(C_in·k·k + 1)"
      ],
      [
       "размер выхода",
       "⌊(H + 2p − d(k − 1) − 1) / s⌋ + 1"
      ],
      [
       "backprop",
       "градиент по ядру — свёртка входа с ∂L/∂Y; по входу — «полная» свёртка с перевёрнутым ядром"
      ],
      [
       "блоки",
       "max pooling, GAP, свёртка 1 × 1, остаточная связь y = F(x) + x"
      ],
      [
       "архитектура",
       "стадии conv-bn-relu; ÷2 разрешение, ×2 каналы; в конце GAP и linear"
      ],
      [
       "регуляризация",
       "аугментации, label smoothing, mixup / CutMix, weight decay"
      ],
      [
       "вехи",
       "LeNet → AlexNet → VGG → Inception → ResNet → MobileNet → EfficientNet"
      ],
      [
       "практика",
       "transfer learning с предобученного backbone"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Домашнее задание к главе появится позже. Проверь себя: сможешь ли ты посчитать размер выхода и число параметров для свёртки 3 × 3 с 64 фильтрами, padding 1 и stride 2 на входе 3 × 224 × 224?"
    }
   ],
   "terms": []
  }
 ]
}
