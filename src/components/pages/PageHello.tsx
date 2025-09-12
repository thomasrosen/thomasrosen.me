import { Emoji } from '@/components/Emoji'
import { Typo } from '@/components/Typo'

export default function PageHello() {
  return (
    <section className="tab_content">
      <Typo as="h2" className="mb-6">
        Hi, nice to meet you <Emoji>👋</Emoji>
      </Typo>

      <Typo as="p">
        For me, programming has always been a tool that helps me achieve what I want to do. And that
        is not developing software per se, but to help everyone be more conscious of each other and
        be more compassionate.
      </Typo>
      <Typo as="p">
        <a href="mailto:hello@thomasrosen.me">Send me a text</a> if you have any questions or
        something else to tell me :) I'd love to hear from you!
      </Typo>
      <Typo as="p" className="!font-[900]">
        Best, Thomas
      </Typo>
    </section>
  )
}
