import { StackButtonRoute } from "app/layouts/components/StackButtonRoute"
import checkUnreadNotifications from "app/notifications/queries/checkUnreadNotifications"
import { useQuery } from "blitz"
import React, { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"
import { FiBell } from "react-icons/fi"

type Props = {
  isActive: boolean
  onClick?: () => void
}

export const StackButtonRouteNotifications: FunctionComponent<Props> = ({
  ...props
}) => {
  const { t } = useTranslation()

  const [hasBadge] = useQuery(checkUnreadNotifications, null, {
    refetchInterval: 2000,
  })

  return (
    <StackButtonRoute icon={FiBell} hasBadge={hasBadge} {...props}>
      {t("Notifications")}
    </StackButtonRoute>
  )
}
