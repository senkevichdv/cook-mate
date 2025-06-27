import { useUser } from "@/context/UserContext"
import { addLike, removeLike, isLiked } from "@/lib/likesStorage"
import { Recipe } from "@/models"
import { Text } from "@telegram-apps/telegram-ui"
import { useState } from "react"

const LikeButton = ({ recipe }: { recipe: Recipe }) => {
  const user = useUser()
  const userId = user?.id

  const liked = userId ? isLiked(userId, recipe.title) : false
  const [likedState, setLikedState] = useState(liked)

  const handleLike = () => {
    if (!userId) return
    if (likedState) {
      removeLike(userId, recipe.title)
    } else {
      addLike(userId, recipe)
    }
    setLikedState(!likedState)
  }

  return (
    <Text onClick={handleLike} style={{ cursor: "pointer" }}>
      {liked ? "❤️" : "🤍"}
    </Text>
  )
}

export default LikeButton
