export default function Day16LanguagesTasks() {
  return {
    tasks: [
      {
        text: 'Какой язык проще для начинающего?',
        type: 'choice',
        answer: 'python',
        options: ['python', 'c++', 'java', 'rust'],
        hint: 'Python, JavaScript - популярны для новичков',
        difficulty: 'Легко',
      },
      {
        text: 'Какой язык самый быстрый?',
        type: 'choice',
        answer: 'c++',
        options: ['c++', 'python', 'javascript', 'java'],
        hint: 'C++ или Rust для максимальной производительности',
        difficulty: 'Средне',
      },
      {
        text: 'Для чего нужен JavaScript?',
        type: 'choice',
        answer: 'веб',
        options: ['веб', 'базы данных', 'системное ПО', 'игры'],
        hint: 'JavaScript для фронтенда и веб-разработки',
        difficulty: 'Легко',
      },
      {
        text: 'Какой язык популярен для backend?',
        type: 'choice',
        answer: 'python',
        options: ['python', 'javascript', 'rust', 'go'],
        hint: 'Python, Java, Go, Node.js популярны для backend',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое фреймворк?',
        type: 'choice',
        answer: 'библиотека',
        options: ['библиотека', 'язык', 'программа', 'инструмент'],
        hint: 'Набор готовых инструментов и структур для разработки',
        difficulty: 'Средне',
      },
      {
        text: 'Какой фреймворк для React разработки?',
        type: 'choice',
        answer: 'node',
        options: ['node', 'python', 'java', 'rust'],
        hint: 'React это фреймворк для JavaScript/Node.js',
        difficulty: 'Средне',
      },
    ],
  }
}
