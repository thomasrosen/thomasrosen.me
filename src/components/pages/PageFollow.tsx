import { DotLinkRow } from '@/components/DotLinkRow'
import { LinksGridDivider } from '@/components/LinksGridDivider'
import { Typo } from '@/components/Typo'

export default function PageFollow({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Typo as="h2" className="mb-6">
        Follow
      </Typo>

      <div className="links_grid">
        <DotLinkRow
          color="#ed4956"
          data-umami-event="instagram"
          href="https://www.instagram.com/thomasrosen/"
          label="Instagram"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#000"
          data-umami-event="threads"
          href="https://www.threads.com/@thomasrosen"
          label="Threads"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#00f2ea" // #ff0050 #00f2ea
          data-umami-event="tiktok"
          href="https://www.tiktok.com/@thomasroses"
          label="TikTok"
          value="thomasroses"
        />
        <DotLinkRow
          color="#ff0000"
          data-umami-event="youtube"
          href="https://youtube.com/@thomas_rosen"
          label="YouTube"
          value="thomas_rosen"
        />
        <DotLinkRow
          color="#0a66c1"
          data-umami-event="linkedin"
          href="https://www.linkedin.com/in/thomasroses/"
          label="LinkedIn"
          value="thomasroses"
        />

        <LinksGridDivider />

        <DotLinkRow
          color="#00f"
          data-umami-event="bluesky"
          href="https://bsky.app/profile/thomasrosen.me"
          label="Bluesky"
          value="@thomasrosen.me"
        />
        <DotLinkRow
          color="#2f93d7"
          data-umami-event="mastodon"
          href="https://mastodon.social/@thomasrosen"
          label="Mastodon"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#1da1f2"
          data-umami-event="twitter"
          href="https://twitter.com/thomas_roses"
          label="Twitter"
          value="thomas_roses"
        />
        <DotLinkRow
          color="#000000"
          data-umami-event="subreply"
          href="https://subreply.com/thomasrosen"
          label="Subreply"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#268f23"
          data-umami-event="medium"
          href="https://medium.com/@thomas_rosen"
          label="Medium"
          value="thomas_rosen"
        />
        <DotLinkRow
          color="#001935"
          data-umami-event="tumblr"
          href="https://thomasrosen.tumblr.com/"
          label="Tumblr"
          value="thomasrosen"
        />

        <LinksGridDivider />

        <DotLinkRow
          color="#000000"
          data-umami-event="github"
          href="https://github.com/thomasrosen"
          label="GitHub"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#e24329"
          data-umami-event="gitlab"
          href="https://gitlab.com/thomasrosen"
          label="GitLab"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#e24329"
          data-umami-event="gitlab-volt"
          href="https://gitlab.com/thomas.rosen.volt"
          label="GitLab (Volt DE)"
          value="thomas.rosen.volt"
        />
        <DotLinkRow
          color="#000000"
          data-umami-event="dev-to"
          href="https://dev.to/thomasrosen"
          label="dev.to"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#7ebc6f"
          data-umami-event="openstreetmap"
          href="https://www.openstreetmap.org/user/thomasrosen"
          label="OpenStreetMap"
          value="thomasrosen"
        />

        <LinksGridDivider />

        <DotLinkRow
          color="#d60017"
          data-umami-event="apple-music"
          href="https://music.apple.com/profile/thomasrosen"
          label="Apple Music"
          value="thomasrosen"
        />
        <DotLinkRow
          color="#1ed760"
          data-umami-event="spotify"
          href="https://open.spotify.com/user/1165642010"
          label="Spotify"
          value="Thomas Rosen (1165642010)"
        />

        <LinksGridDivider />

        <DotLinkRow
          color="#e60023"
          data-umami-event="pinterest"
          href="https://www.pinterest.com/thomas_roses/"
          label="Pinterest"
          value="thomas_roses"
        />
        <DotLinkRow
          color="#1067d9"
          data-umami-event="flickr"
          href="https://www.flickr.com/people/116207237@N03/"
          label="Flickr"
          value="Thomas Rosen (thomasroses / 116207237@N03)"
        />
        <DotLinkRow
          color="#ea4c89"
          data-umami-event="dribbble"
          href="https://dribbble.com/thomasrosen/likes"
          label="Dribbble"
          value="thomasrosen/likes"
        />
      </div>
    </section>
  )
}
