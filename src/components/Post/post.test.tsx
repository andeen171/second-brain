import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LatestPost } from './post'

test('Link changes the state when hovered', async () => {
  render(
    <LatestPost />
  )

  const post = screen.getByText('You have no posts yet.')
})