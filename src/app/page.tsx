import Link from 'next/link'

import { LatestPost } from '~/components/Post/post'
import BackgroundDots from '~/components/ui/dotbg'
import Particles from '~/components/ui/particles'
import { getServerAuthSession } from '~/server/auth'
import { api, HydrateClient } from '~/trpc/server'

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC' })
  const session = await getServerAuthSession()

  void api.post.getLatest.prefetch()

  return (
    <HydrateClient>
      <main className="bg-radial-gradient flex min-h-screen flex-col items-center justify-center">
        <div className="container z-10 flex flex-col items-center justify-center gap-12 px-4 py-16 text-white">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : 'Loading tRPC query...'}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? '/api/auth/signout' : '/api/auth/signin'}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? 'Sign out' : 'Sign in'}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
        <Particles className="absolute left-0 top-0 h-full w-full" />
        <BackgroundDots className="absolute inset-0 -z-0" />
      </main>
    </HydrateClient>
  )
}
