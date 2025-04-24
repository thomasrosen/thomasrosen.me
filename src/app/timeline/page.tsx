import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'

export default async function PageTimeline({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { tags } = await searchParams

  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : undefined

  return (
    <>
      <Typo as='h2' className='tab_content'>
        <div className='flex flex-wrap gap-2'>
          {tagsArray?.map((tag) => (
            <Badge variant='accent' key={tag} size='lg'>
              {tag}
            </Badge>
          ))}
        </div>
      </Typo>

      <Timeline tags={tagsArray} />
    </>
  )
}
