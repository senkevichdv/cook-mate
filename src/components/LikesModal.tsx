import { useUser } from "@/context/UserContext"
import { getLikes } from "@/lib/likesStorage"
import { Button, List, Modal, Section, Text } from "@telegram-apps/telegram-ui"
import RecipeComponent from "./Recipe"

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
            <Text style={{ fontSize: 24 }}>❤️</Text>
          </Button>
        }
      >
        <List>
          <Section
            header={<Section.Header large>Найденные рецепты</Section.Header>}
          >
            {likes.map((recipe, idx) => (
              <RecipeComponent key={idx} recipe={recipe} idx={idx} />
            ))}
          </Section>
        </List>
      </Modal>
    </div>
  )
}

export default LikesModal