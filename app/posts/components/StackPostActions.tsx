import { HStack, Icon, useClipboard, useToast } from "@chakra-ui/react"
import { ButtonPostAction } from "app/posts/components/ButtonPostAction"
import createPostLike from "app/posts/mutations/createPostLike"
import createQuotation from "app/posts/mutations/createQuotation"
import deletePostLike from "app/posts/mutations/deletePostLike"
import { useMutation, useRouter } from "blitz"
import React, { FunctionComponent } from "react"
import { FiClipboard, FiHeart, FiMessageCircle, FiRepeat, FiShare } from "react-icons/fi"

type Props = {
  hasLike: boolean
  hasQuotation: boolean
  hasReply: boolean
  isDisabled: boolean
  likesCount: number
  postId: string
  quotationsCount: number
  repliesCount: number
  text: string | null
}

export const StackPostActions: FunctionComponent<Props> = ({
  hasLike,
  hasQuotation,
  hasReply,
  isDisabled,
  likesCount,
  postId,
  quotationsCount,
  repliesCount,
  text,
}) => {
  const router = useRouter()

  const toast = useToast()

  const { hasCopied, onCopy } = useClipboard(
    typeof window !== "undefined" ? window.location.href : ""
  )

  const [createPostLikeMutation, { isLoading: isLoadingCreatePostLike }] = useMutation(
    createPostLike
  )

  const [deletePostLikeMutation, { isLoading: isLoadingDeletePostLike }] = useMutation(
    deletePostLike
  )

  const [createQuotationMutation, { isLoading: isLoadingCreateQuotation }] = useMutation(
    createQuotation
  )

  const onCreateReply = () => {
    router.push(`/posts/${postId}`)
  }

  const onCreateLike = async () => {
    try {
      if (hasLike) {
        await deletePostLikeMutation({ postId })
      } else {
        await createPostLikeMutation({ postId })
      }
    } catch (error) {
      toast({ status: "error", title: error.message })
    }
  }

  const onCreateQuotation = async () => {
    try {
      await createQuotationMutation({ postId })
      toast({ status: "success", title: "Success" })
    } catch (error) {
      toast({ status: "error", title: error.message })
    }
  }

  const onShare = () => {
    if (hasShareAPI) {
      navigator.share({
        title: "Feed",
        text: text || "null",
        url: window.location.href,
      })
      return
    }
    onCopy()
  }

  const hasShareAPI = typeof navigator.share !== "undefined"

  return (
    <HStack spacing={2}>
      <ButtonPostAction
        aria-label={"Repost"}
        isActive={!isDisabled && hasQuotation}
        isDisabled={isDisabled || isLoadingCreateQuotation}
        leftIcon={<Icon as={FiRepeat} display={"flex"} />}
        onClick={onCreateQuotation}
      >
        {quotationsCount}
      </ButtonPostAction>
      <ButtonPostAction
        aria-label={"Like"}
        isActive={!isDisabled && hasLike}
        isDisabled={isDisabled || isLoadingDeletePostLike || isLoadingCreatePostLike}
        leftIcon={<Icon as={FiHeart} display={"flex"} />}
        onClick={onCreateLike}
      >
        {likesCount}
      </ButtonPostAction>
      <ButtonPostAction
        aria-label={"Reply"}
        isActive={hasReply}
        leftIcon={<Icon as={FiMessageCircle} display={"flex"} />}
        onClick={onCreateReply}
      >
        {repliesCount}
      </ButtonPostAction>
      <ButtonPostAction
        aria-label={"Share"}
        leftIcon={<Icon as={hasShareAPI ? FiShare : FiClipboard} display={"flex"} />}
        onClick={onShare}
      >
        {hasShareAPI ? "Share" : hasCopied ? "Copied" : "Copy"}
      </ButtonPostAction>
    </HStack>
  )
}
