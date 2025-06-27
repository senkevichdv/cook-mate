"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Recipe } from "@/models"
import ResultsStep from "@/components/ResultsStep"
import FormStep from "@/components/FormStep"
import LoadingStep from "@/components/LoadingStep"

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleFormSubmit = (filters: string[], userQuery: string) => {
    setStep("loading")
    const fetchRecipes = async () => {
      const response = await fetch("/api/llm", {
        method: "POST",
        body: JSON.stringify({ filters, userQuery }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      console.log(data)
      setRecipes(data)
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
