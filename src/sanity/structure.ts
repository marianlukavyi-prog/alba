import type { StructureBuilder, StructureResolver } from 'sanity/structure'

const langItem = (S: StructureBuilder, id: string, flag: string, title: string) =>
  S.listItem()
    .id(`posts-${id}`)
    .title(`${flag} ${title}`)
    .child(
      S.documentList()
        .id(`posts-${id}-list`)
        .title(`Posts · ${title}`)
        .schemaType('post')
        .filter('_type == "post" && language == $language')
        .params({ language: id })
        .canHandleIntent((intent, params) => intent === 'edit' && params.type === 'post'),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('posts-translations')
        .title('📚 Posts (grouped)')
        .child(
          S.documentTypeList('translation.metadata')
            .title('Posts · all translations')
            .filter('_type == "translation.metadata" && schemaTypes[0] == "post"'),
        ),
      S.listItem()
        .id('posts-by-language')
        .title('🌐 Posts (by language)')
        .child(
          S.list()
            .id('posts-by-language-list')
            .title('Choose language')
            .items([
              langItem(S, 'es', '🇪🇸', 'Español'),
              langItem(S, 'en', '🇬🇧', 'English'),
              langItem(S, 'uk', '🇺🇦', 'Українська'),
              langItem(S, 'ru', '🇷🇺', 'Русский'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('tag').title('Tags'),
    ])
