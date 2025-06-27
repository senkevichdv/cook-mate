"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  List,
  Text,
  Section,
  Spinner,
  Accordion,
  Subheadline,
  Placeholder,
  Checkbox,
} from "@telegram-apps/telegram-ui";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'

const FILTER_OPTIONS = [
  "курица",
  "говядина",
  "рыба",
  "овощи",
  "быстро",
  "среднее",
  "сложное",
  "веган",
  "вегетарианец",
  "ПП",
  "нет",
  "горячее",
  "легкое",
  "острое",
  "сладкое",
  "не важно",
];

function FormStep({
  onSubmit,
}: {
  onSubmit: (filters: string[]) => void;
}) {
  const [filters, setFilters] = useState<string[]>([]);

  // const [cookingTime, setCookingTime] = useState<'15' | '30' | 'неважно'>("15");
  // const [type, setType] = useState<'курица' | 'говядина' | 'рыба' | 'овощи' | 'неважно'>("курица");
  // const [complexity, setComplexity] = useState<'просто' | 'среднее' | 'сложное' | 'неважно'>("просто");
  // const [diet, setDiet] = useState<'веган' | 'вегетарианец' | 'ПП' | 'нет' | 'неважно'>("веган");
  // const [mood, setMood] = useState<'горячее' | 'легкое' | 'острое' | 'сладкое' | 'не важно'>("горячее");

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
          <Button size="l" stretched onClick={() => onSubmit(filters)}>
            Найти рецепт
          </Button>
        }
        description="Выберите параметры для поиска рецепта"
        header="Поиск рецепта"
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
                <Text style={{marginLeft: 8}}>{name}</Text>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Placeholder>
      {/* <List>
        <Select
          header="Время готовки"
          value={cookingTime}
          onChange={(e) =>
            setCookingTime(e.target.value as "15" | "30" | "неважно")
          }
        >
          <option>15</option>
          <option>30</option>
          <option>Неважно</option>
        </Select>
        <Select
          header="Тип"
          value={type}
          onChange={(e) =>
            setType(
              e.target.value as
                | "курица"
                | "говядина"
                | "рыба"
                | "овощи"
                | "неважно"
            )
          }
        >
          <option>Курица</option>
          <option>Говядина</option>
          <option>Рыба</option>
          <option>Овощи</option>
          <option>Не важно</option>
        </Select>
        <Select
          header="Сложность"
          value={complexity}
          onChange={(e) =>
            setComplexity(
              e.target.value as "просто" | "среднее" | "сложное" | "неважно"
            )
          }
        >
          <option>Просто</option>
          <option>Среднее</option>
          <option>Сложное</option>
          <option>Не важно</option>
        </Select>
        <Select
          header="Диета"
          value={diet}
          onChange={(e) =>
            setDiet(
              e.target.value as
                | "веган"
                | "вегетарианец"
                | "ПП"
                | "нет"
                | "неважно"
            )
          }
        >
          <option>Веган</option>
          <option>Вегетарианец</option>
          <option>ПП</option>
          <option>Нет</option>
          <option>Не важно</option>
        </Select>
        <Select
          header="Настроение"
          value={mood}
          onChange={(e) =>
            setMood(
              e.target.value as
                | "горячее"
                | "легкое"
                | "острое"
                | "сладкое"
                | "не важно"
            )
          }
        >
          <option>Горячее</option>
          <option>Легкое</option>
          <option>Острое</option>
          <option>Сладкое</option>
          <option>Не важно</option>
        </Select>
      </List> */}
      {/* <div style={{ padding: 16, textAlign: "center" }}>
        <Button
          size="l"
          mode="bezeled"
          onClick={() =>
            onSubmit({ cookingTime, type, complexity, diet, mood })
          }
        >
          Найти рецепт
        </Button>
      </div> */}
    </motion.div>
  );
}

// --- Step 2: LoadingStep ---
function LoadingStep() {
  return (
    <motion.div
      key="loading"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
      }}
    >
      <Spinner size="l" />
      <div style={{ marginTop: 16, fontSize: 18 }}>Ищем рецепт…</div>
    </motion.div>
  );
}

// --- Step 3: ResultStep ---
function ResultStep({
  recipes,
  onBack,
}: {
  recipes: any[];
  onBack: () => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <motion.div
      key="results"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%" }}
    >
      <List>
        <Section header={<Section.Header large>Ваши рецепты</Section.Header>}>
          {recipes.map((recipe, idx) => (
            <Accordion
              onChange={() => setExpanded(expanded === idx ? null : idx)}
              key={idx}
              expanded={expanded === idx}
            >
              <Accordion.Summary>{recipe.name}</Accordion.Summary>
              <Accordion.Content>
                <Subheadline
                  level="2"
                  style={{
                    padding: "12px 24px 24px",
                  }}
                >
                  <Text weight="3">Ингредиенты:</Text>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {recipe.ingredients.map((ing: string, i: number) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                  <div style={{ margin: "8px 0 4px", fontWeight: 500 }}>
                    Steps:
                  </div>
                  <ol style={{ margin: 0, paddingLeft: 18 }}>
                    {recipe.steps.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </Subheadline>
              </Accordion.Content>
            </Accordion>
          ))}
        </Section>
      </List>
      <div style={{ padding: 16, textAlign: "center" }}>
        <Button size="l" mode="bezeled" onClick={onBack}>
          Back
        </Button>
      </div>
    </motion.div>
  );
}

// --- Main Page ---
const FAKE_RECIPES = [
  {
    name: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
    steps: ["Boil pasta", "Fry pancetta", "Mix eggs and cheese", "Combine all"],
  },
  {
    name: "Vegetarian Sushi",
    ingredients: ["Rice", "Nori", "Cucumber", "Avocado", "Carrot"],
    steps: ["Cook rice", "Prepare veggies", "Roll sushi", "Slice and serve"],
  },
  {
    name: "Chicken Tacos",
    ingredients: ["Tortillas", "Chicken", "Lettuce", "Cheese", "Salsa"],
    steps: ["Cook chicken", "Warm tortillas", "Assemble tacos"],
  },
];

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleFormSubmit = (filters: string[]) => {
    setStep("loading");
    console.log(filters);
    // Simulate API call
    setTimeout(() => {
      setRecipes(FAKE_RECIPES);
      setStep("results");
    }, 1800);
  };

  const handleBack = () => {
    setStep("form");
    setRecipes([]);
  };

  return (
    <AnimatePresence mode="wait">
      {step === "form" && (
        <FormStep key="form" onSubmit={handleFormSubmit} />
      )}
      {step === "loading" && <LoadingStep key="loading" />}
      {step === "results" && (
        <ResultStep key="results" recipes={recipes} onBack={handleBack} />
      )}
    </AnimatePresence>
  );
}
