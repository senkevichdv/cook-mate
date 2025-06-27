"use client";

import { useCallback, useState } from "react";
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

export interface Recipe {
  title: string; // Название блюда
  cookingTime: string; // Пример: "30 минут", "15–20 минут"
  ingredients: string[]; // Список ингредиентов, как строки
  steps: string[]; // Пошаговая инструкция, каждый шаг отдельной строкой
  tips?: string[]; // Советы, не обязательное поле
}

const FILTER_OPTIONS = [
  "Без мяса",
  "Без рыбы и морепродуктов",
  "Без молочных продуктов",
  "Без яиц",
  "Без глютена",
  "Без сладкого",
  "Только простые блюда",
  "Готовка до 15 минут",
  "Подходит для завтрака",
  "Подходит для обеда",
  "Подходит для ужина",
  "Можно приготовить заранее",
  "Только из свежих продуктов",
  "Что-то к чаю",
  "Постное блюдо",
];

function FormStep({
  onSubmit,
}: {
  onSubmit: (filters: string[]) => void;
}) {
  const [filters, setFilters] = useState<string[]>([]);
  const submitHandler = useCallback(() => {
    onSubmit(filters);
  }, [filters]);

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
    </motion.div>
  );
}

// --- Step 3: ResultStep ---
function ResultStep({
  recipes,
  onBack,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <Accordion.Summary>
                <Text weight="3">{recipe.title} ({recipe.cookingTime})</Text>
              </Accordion.Summary>
              <Accordion.Content>
                <Subheadline
                  level="2"
                  style={{
                    padding: "12px 24px 24px",
                  }}
                >
                  <List>
                    <Text weight="3">Ингредиенты:</Text>
                    <ul style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}>
                      {recipe.ingredients.map((ing: string, i: number) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                    <Text weight="3">Шаги:</Text>
                    <ol style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}>
                      {recipe.steps.map((step: string, i: number) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    {recipe.tips?.length && <Text weight="3">Советы:</Text>}
                    <ul style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}>
                      {recipe.tips?.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </List>
                </Subheadline>
              </Accordion.Content>
            </Accordion>
          ))}
        </Section>
      </List>
      <div style={{ padding: 16, textAlign: "center" }}>
        <Button size="l" mode="gray" onClick={onBack}>
          Назад к поиску
        </Button>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleFormSubmit = (filters: string[]) => {
    setStep("loading");
    // console.log(filters);
    const fetchRecipes = async () => {
      const response = await fetch("/api/llm", {
        method: "POST",
        body: JSON.stringify({ filters }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setRecipes(data);
      setStep("results");
    };
    fetchRecipes();
    // // Simulate API call
    // setTimeout(() => {
    //   const prompt = generateRecipePrompt(filters);
    //   console.log(prompt);
    //   setRecipes(FAKE_RECIPES);
    //   setStep("results");
    // }, 1800);
  };

  const handleBack = () => {
    setStep("form");
    setRecipes([]);
  };

  return (
    <AnimatePresence mode="wait">
      {step === "form" && <FormStep key="form" onSubmit={handleFormSubmit} />}
      {step === "loading" && (
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
      )}
      {step === "results" && (
        <ResultStep key="results" recipes={recipes} onBack={handleBack} />
      )}
    </AnimatePresence>
  );
}
