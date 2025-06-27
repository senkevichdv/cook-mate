import { useUser } from "@/context/UserContext"
import { getLikes } from "@/lib/likesStorage"
import { Button, Dialog, DialogTitle, DialogContent, List, ListItem } from '@mui/material'
import RecipeComponent from "./Recipe"

interface LikesModalProps {
  open: boolean
  onClose: () => void
}

const LikesModal = ({ open, onClose }: LikesModalProps) => {
  const user = useUser()
  const userId = user?.id
  const likes = userId ? getLikes(userId) : []
  return (
    <div style={{ position: "fixed", top: 8, right: 8 }}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Избранные рецепты</DialogTitle>
        <DialogContent>
          <List>
            {likes.map((recipe, idx) => (
              <ListItem key={idx}>
                <RecipeComponent recipe={recipe} idx={idx} />
              </ListItem>
            ))}
          </List>
          <Button onClick={onClose} variant="outlined" fullWidth sx={{ mt: 2 }}>
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LikesModal