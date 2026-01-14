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
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s ease',
        },
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .MuiAccordionSummary-content': {
            alignItems: 'center',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              {recipe.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              ⏱️ {recipe.cookingTime}
            </Typography>
          </Box>
          <LikeButton recipe={recipe} />
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: 'action.hover', p: 3 }}>
        <Box mb={3}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              mb: 2, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: '1.1rem'
            }}
          >
            🛒 Ингредиенты:
          </Typography>
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 1 }}>
            {recipe.ingredients.map((ing: string, i: number) => (
              <ListItem 
                key={i}
                sx={{ 
                  py: 1, 
                  borderBottom: i < recipe.ingredients.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                • {ing}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box mb={3}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              mb: 2, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: '1.1rem'
            }}
          >
            👨‍🍳 Приготовление:
          </Typography>
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 1 }}>
            {recipe.steps.map((step: string, i: number) => (
              <ListItem 
                key={i}
                sx={{ 
                  py: 1.5, 
                  borderBottom: i < recipe.steps.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Box 
                  sx={{ 
                    minWidth: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  {i + 1}
                </Box>
                {step}
              </ListItem>
            ))}
          </List>
        </Box>
        {recipe.tips?.length && (
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontSize: '1.1rem'
              }}
            >
              💡 Советы:
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 1 }}>
              {recipe.tips?.map((tip: string, i: number) => (
                <ListItem 
                  key={i}
                  sx={{ 
                    py: 1, 
                    borderBottom: i < recipe.tips.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider'
                  }}
                >
                  💡 {tip}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default RecipeComponent