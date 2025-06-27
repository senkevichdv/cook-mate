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

export interface Recipe {
  title: string; // Название блюда
  cookingTime: string; // Пример: "30 минут", "15–20 минут"
  ingredients: string[]; // Список ингредиентов, как строки
  steps: string[]; // Пошаговая инструкция, каждый шаг отдельной строкой
  tips?: string[]; // Советы, не обязательное поле
}

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

const FAKE_RECIPES: Recipe[] = [
  {
    title: "Курица в сметане с картофелем",
    cookingTime: "40 минут",
    ingredients: [
      "куриное филе — 300 г",
      "картофель — 4 шт.",
      "сметана — 3 ст. ложки",
      "чеснок — 2 зубчика",
      "соль, перец — по вкусу",
    ],
    steps: [
      "Очистите и нарежьте картофель кружками.",
      "Нарежьте куриное филе кусочками, посолите и поперчите.",
      "Выложите в форму слоями: картофель, курицу, сметану с чесноком.",
      "Запекайте при 180°C около 35–40 минут до румяной корочки.",
    ],
    tips: ["Можно добавить немного сыра сверху перед запеканием."],
  },
];

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
