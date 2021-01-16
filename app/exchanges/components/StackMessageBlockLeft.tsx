import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { AvatarUser } from "app/components/AvatarUser"
import { StackCard } from "app/components/StackCard"
import { StackMessageDate } from "app/exchanges/components/StackMessageDate"
import { MessageBlock } from "app/exchanges/types/messageBlock"
import React, { FunctionComponent } from "react"

type Props = MessageBlock

export const StackCardMessageLeft: FunctionComponent<Props> = ({
  createdAt,
  hasAvatar,
  hasTime,
  text,
  userId,
  userName,
}) => {
  return (
    <StackCard py={userId ? 2 : 2}>
      <HStack align={"start"} spacing={4}>
        {hasAvatar ? (
          <Box minW={12}>
            <AvatarUser userId={userId} />
          </Box>
        ) : (
          <Box minW={12} />
        )}
        <Stack spacing={2} w={"full"}>
          {hasAvatar && (
            <Text fontSize={"lg"} fontWeight={"bold"} lineHeight={1}>
              {userName}
            </Text>
          )}
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            lineHeight={1}
            whiteSpace={"pre-wrap"}
          >
            {text}
          </Text>
          {hasTime && <StackMessageDate createdAt={createdAt} />}
        </Stack>
      </HStack>
    </StackCard>
  )
}
