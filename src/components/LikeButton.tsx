import { useUser } from "@/context/UserContext"
import { addLike, removeLike, isLiked } from "@/lib/likesStorage"
import { Recipe } from "@/models"
import { useState } from "react"
import LikeIcon from "./LikeIcon"

const LikeButton = ({ recipe }: { recipe: Recipe }) => {
  const user = useUser()
  const userId = user?.id

  const liked = userId ? isLiked(userId, recipe.title) : false
  const [likedState, setLikedState] = useState(liked)

  const handleLike = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    if (!userId) return
    if (likedState) {
      removeLike(userId, recipe.title)
    } else {
      addLike(userId, recipe)
    }
    setLikedState(!likedState)
  }

  return <LikeIcon liked={likedState} onClick={handleLike} />
}

export default LikeButton
