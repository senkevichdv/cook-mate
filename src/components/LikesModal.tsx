import { useUser } from "@/context/UserContext"
import { getLikes } from "@/lib/likesStorage"
import { Button, List, Modal } from "@telegram-apps/telegram-ui"
import RecipeComponent from "./Recipe"
import LikeIcon from "./LikeIcon"

const LikesModal = () => {
  const user = useUser()
  const userId = user?.id
  const likes = userId ? getLikes(userId) : []
  return (
    <div style={{ position: "fixed", top: 8, right: 8 }}>
      <Modal
        header={<Modal.Header>Избранные рецепты</Modal.Header>}
        trigger={
          <Button mode="plain">
            <LikeIcon liked={false} />
          </Button>
        }
      >
        <List>
          {likes.map((recipe, idx) => (
            <RecipeComponent key={idx} recipe={recipe} idx={idx} />
          ))}
        </List>
      </Modal>
    </div>
  )
}

export default LikesModal