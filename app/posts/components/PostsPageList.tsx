import { StackDivider } from "@chakra-ui/react"
import { StackList } from "app/components/StackList"
import { StackCardPost } from "app/posts/components/StackCardPost"
import getPostsInfinite from "app/posts/queries/getPostsInfinite"
import { useInfiniteQuery, useSession } from "blitz"
import React, { FunctionComponent } from "react"

export const PostsPageList: FunctionComponent = () => {
  const session = useSession()

  const [groupedPosts] = useInfiniteQuery(
    getPostsInfinite,
    (page = { take: 80, skip: 0 }) => page,
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
      refetchInterval: 2000,
    }
  )

  return (
    <StackList divider={<StackDivider />}>
      {groupedPosts.map((group) => {
        return group.posts.map((post) => {
          return (
            <StackCardPost
              isDisabled={!session.userId || session.userId === post.userId}
              {...post}
            />
          )
        })
      })}
    </StackList>
  )
}
