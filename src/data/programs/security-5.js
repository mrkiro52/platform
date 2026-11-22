import { SEC_COURSE } from '../winter/sec'

const { chapters, groups } = SEC_COURSE['sec-net']

export async function loadNetworkChapter() {
  const lessons = await Promise.all(chapters.map(chapter => chapter.load()))
  return {
    default: {
      num: 5,
      title: 'Сети: подробнее и с кейсами',
      intro: 'Продолжение главы «Сети». Материалы 86–117 зимнего лагеря охватывают сетевые протоколы, настройку инфраструктуры и защиту сети. В кейсах разобраны конфигурации и признаки инцидентов.',
      sections: chapters.map((chapter, index) => {
        const lesson = lessons[index].default
        const divider = chapters[index - 1]?.level !== chapter.level
          ? groups.find(group => group.level === chapter.level)?.title
          : undefined
        return {
          id: chapter.ref,
          num: String(86 + index),
          title: chapter.title,
          divider,
          blocks: lesson.sections.flatMap(section => [
            ...(lesson.sections.length > 1 ? [{ t: 'h3', text: section.title }] : []),
            ...section.blocks.filter(block => !block.text?.startsWith('**Самопроверка.**')),
          ]),
        }
      }),
    },
  }
}
