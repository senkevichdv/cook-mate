import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { FILTER_OPTIONS } from "@/constants"
import { useUser } from "@/context/UserContext"
import LikesModal from "./LikesModal"
import LikeIcon from "./LikeIcon"
import { getLikes } from "@/lib/likesStorage"

interface FormStepProps {
  onSubmit: (filters: string[], userQuery: string) => void
}

const FormStep = ({ onSubmit }: FormStepProps) => {
  const [filters, setFilters] = useState<string[]>([])
  const [userQuery, setUserQuery] = useState<string>("")
  const [likesModalOpen, setLikesModalOpen] = useState<boolean>(false)
  const user = useUser()
  const likes = user?.id ? getLikes(user.id) : []

  const submitHandler = () => {
    onSubmit(filters, userQuery)
  }

  return (
    <motion.div
      key="form"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%" }}
    >
      {likes.length > 0 && (
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => setLikesModalOpen(true)}
        >
          <LikeIcon liked={false} />
        </IconButton>
      )}
      <LikesModal
        open={likesModalOpen}
        onClose={() => setLikesModalOpen(false)}
      />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Image
          width={250}
          height={200}
          alt="Telegram sticker"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY21ubDMyc3B6cTU4cW1nZG00OG9zNXJ6eTYyM3Jwd3FxbHpiazltMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rkgX9MTBXJa1O/giphy.gif"
        />
        <Typography variant="h6">
          Привет, {user?.firstName || "друг"}!
        </Typography>
        <Typography variant="body1">
          Выбери параметры для поиска рецепта
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="filters-label">Фильтры</InputLabel>
          <Select
            label="Фильтры"
            value={filters}
            multiple
            labelId="filters-label"
            MenuProps={{
              sx: {
                maxHeight: 400,
              },
            }}
            renderValue={(selected) => selected.map((item) => item).join(", ")}
            onChange={(e) => setFilters(e.target.value as string[])}
          >
            {FILTER_OPTIONS.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filters.indexOf(name) > -1} />
                <Typography style={{ marginLeft: 8 }}>{name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Ключевые слова"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Найти рецепт
        </Button>
      </Box>
    </motion.div>
  )
}

export default FormStep
