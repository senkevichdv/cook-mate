import { Recipe } from "@/models"

export function getLikes(userId: number): Recipe[] {
  if (!userId) return []
  const data = localStorage.getItem(`likes_${userId}`)
  return data ? JSON.parse(data) : []
}

export function addLike(userId: number, recipe: Recipe) {
  const likes = getLikes(userId)
  if (!likes.some((r) => r.title === recipe.title)) {
    localStorage.setItem(`likes_${userId}`, JSON.stringify([...likes, recipe]))
  }
}

export function removeLike(userId: number, recipeTitle: string) {
  const likes = getLikes(userId)
  localStorage.setItem(
    `likes_${userId}`,
    JSON.stringify(likes.filter((r) => r.title !== recipeTitle))
  )
}

export function isLiked(userId: number, recipeTitle: string): boolean {
  return getLikes(userId).some((r) => r.title === recipeTitle)
}
