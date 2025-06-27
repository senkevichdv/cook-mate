import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, Typography, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from "react"
import LikeButton from "./LikeButton"
import { Recipe } from "@/models"

interface RecipeComponentProps {
  recipe: Recipe
  idx: number
}

const RecipeComponent = ({ recipe, idx }: RecipeComponentProps) => {
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
    <Accordion
      onChange={() => setExpanded(expanded === idx ? null : idx)}
      key={idx}
      expanded={expanded === idx}
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {recipe.title} ({recipe.cookingTime}) <LikeButton recipe={recipe} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box mb={1}>
          <Typography variant="subtitle1">Ингредиенты:</Typography>
          <List>
            {recipe.ingredients.map((ing: string, i: number) => (
              <ListItem key={i}>{ing}</ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Typography variant="subtitle1">Шаги:</Typography>
          <List>
            {recipe.steps.map((step: string, i: number) => (
              <ListItem key={i}>{step}</ListItem>
            ))}
          </List>
        </Box>
        {recipe.tips?.length && (
          <Box mt={2}>
            <Typography variant="subtitle1">Советы:</Typography>
            <List>
              {recipe.tips?.map((tip: string, i: number) => (
                <ListItem key={i}>{tip}</ListItem>
              ))}
            </List>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default RecipeComponent