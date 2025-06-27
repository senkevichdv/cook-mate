"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Recipe } from "@/models"
import ResultsStep from "@/components/ResultsStep"
import FormStep from "@/components/FormStep"
import LoadingStep from "@/components/LoadingStep"
// import { useUser } from "@/context/UserContext"

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  // const user = useUser()

  const handleFormSubmit = (filters: string[], userQuery: string) => {
    setStep("loading")
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/llm", {
          method: "POST",
          body: JSON.stringify({ filters, userQuery }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log(response)

        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error(error)
      } finally {
        setStep("results")
      }
      // if (user) {

      // } else {
      //   setRecipes([
      //     {
      //       title: "Название блюда",
      //       cookingTime: "примерное время (например: 20 минут)",
      //       ingredients: ["Куриное филе — 300 г", "Картофель — 4 штуки"],
      //       steps: [
      //         "Нарежьте куриное филе кубиками по 2 см.",
      //         "Разогрейте сковороду на среднем огне...",
      //       ],
      //       tips: [
      //         "Можно посыпать блюдо тёртым сыром за 5 минут до конца.",
      //         "Добавьте базилик для аромата, если есть.",
      //       ],
      //     },
      //   ])
      // }
      setStep("results")
    }
    fetchRecipes()
  }

  const handleBack = () => {
    setStep("form")
    setRecipes([])
  }

  return (
    <AnimatePresence mode="wait">
      {step === "form" && <FormStep key="form" onSubmit={handleFormSubmit} />}
      {step === "loading" && <LoadingStep />}
      {step === "results" && (
        <ResultsStep key="results" recipes={recipes} onBack={handleBack} />
      )}
    </AnimatePresence>
  )
}
