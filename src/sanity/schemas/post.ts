import { defineArrayMember, defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      description: 'Locale: es | en | uk | ru',
      validation: (rule) => rule.required(),
      options: {
        list: [
          { value: 'es', title: 'Español' },
          { value: 'en', title: 'English' },
          { value: 'uk', title: 'Українська' },
          { value: 'ru', title: 'Русский' },
        ],
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id?.replace(/^drafts\./, '')
          return client.fetch(
            `!defined(*[_type == "post" && language == $language && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`,
            {
              draft: `drafts.${id}`,
              published: id,
              slug,
              language: document?.language,
            },
          )
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'cover',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Optional larger image used in article header. Falls back to cover.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'author',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'meta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingMinutes',
      type: 'number',
      group: 'meta',
      validation: (rule) => rule.min(1).max(60),
      initialValue: 5,
    }),
    defineField({
      name: 'views',
      type: 'number',
      group: 'meta',
      initialValue: 0,
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Lead', value: 'lead' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    validation: (rule) => rule.required(),
                  }),
                  defineField({
                    name: 'external',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          name: 'note',
          type: 'object',
          title: 'Note callout',
          fields: [
            defineField({
              name: 'text',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text' },
            prepare({ title }) {
              return { title: '📝 Note', subtitle: title }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      media: 'cover',
    },
  },
  orderings: [
    {
      title: 'Published, newest',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
