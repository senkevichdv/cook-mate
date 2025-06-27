import { Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Button, Placeholder, Text } from "@telegram-apps/telegram-ui"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { FILTER_OPTIONS } from "@/constants"
import { useUser } from "@/context/UserContext"

interface FormStepProps {
  onSubmit: (filters: string[], userQuery: string) => void
}

const FormStep = ({ onSubmit }: FormStepProps) => {
  const [filters, setFilters] = useState<string[]>([])
  const [userQuery, setUserQuery] = useState<string>("")
  const user = useUser()

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
      <Placeholder
        action={
          <Button size="l" stretched onClick={submitHandler}>
            Найти рецепт
          </Button>
        }
        description="Выбери параметры для поиска рецепта"
        header={`Привет, ${user?.firstName || "друг"}!`}
      >
        <Image
          width={250}
          height={200}
          alt="Telegram sticker"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY21ubDMyc3B6cTU4cW1nZG00OG9zNXJ6eTYyM3Jwd3FxbHpiazltMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rkgX9MTBXJa1O/giphy.gif"
        />
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
                <Text style={{ marginLeft: 8 }}>{name}</Text>
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
      </Placeholder>
    </motion.div>
  )
}

export default FormStep