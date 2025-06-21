"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitContactForm, type ContactFormState } from "../actions/contact"
import { CheckCircle, AlertCircle, Loader2, User, Mail, MessageSquare } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import React from "react"
import { useTranslation } from 'react-i18next'

const avatarImages = [
  "/images (1).jpeg",
  "/images.jpeg",
  "/placeholder-user.jpg",
  "/placeholder.jpg",
  "/kim.jpg"
]

const initialState: ContactFormState = {}

export default function ContactForm() {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const [nameValue, setNameValue] = React.useState("")
  const [emailValue, setEmailValue] = React.useState("")
  const [messageValue, setMessageValue] = React.useState("")

  React.useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(
          state.message,
          {
            icon: <CheckCircle className="text-green-500" />, 
            style: {
              background: "#f0fdfa",
              color: "#065f46",
              borderRadius: "10px",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)"
            }
          }
        )
        setNameValue("")
        setEmailValue("")
        setMessageValue("")
      } else {
        toast.error(
          state.message,
          {
            icon: <AlertCircle className="text-red-500" />, 
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              borderRadius: "10px",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)"
            }
          }
        )
      }
    }
  }, [state.message, state.success])

  return (
    <Card className="relative shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl p-0">
      <div className="flex flex-col items-center pt-4 z-10 relative">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <Image src="/images.jpeg" alt={t('userAvatar')} width={60} height={60} className="object-cover" />
        </div>
        <CardHeader className="items-center text-center bg-transparent p-2 pb-0">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center text-green-300">{t('quickContact')}</CardTitle>
        </CardHeader>
      </div>
      <CardContent className="pt-1 pb-4 px-4 z-10 relative">
        <form action={formAction} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-blue-400">
              {t('name')}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isPending}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 text-base border rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm ${state.errors?.name ? "border-red-300 focus:ring-red-500" : "border-gray-300"}`}
                autoComplete="off"
              />
            </div>
            {state.errors?.name && (
              <p id="name-error" className="mt-1 text-xs text-red-600">
                {t(state.errors.name[0])}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-blue-400">
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isPending}
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 text-base border rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm ${state.errors?.email ? "border-red-300 focus:ring-red-500" : "border-gray-300"}`}
                autoComplete="off"
              />
            </div>
            {state.errors?.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {t(state.errors.email[0])}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="text-sm font-medium text-blue-400">
              {t('message')}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                disabled={isPending}
                value={messageValue}
                onChange={e => setMessageValue(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 text-base border rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical transition-all shadow-sm ${state.errors?.message ? "border-red-300 focus:ring-red-500" : "border-gray-300"}`}
                autoComplete="off"
              />
            </div>
            {state.errors?.message && (
              <p id="message-error" className="mt-1 text-xs text-red-600">
                {t(state.errors.message[0])}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full py-2 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all duration-200" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('sendingMessage')}
              </>
            ) : (
              <>
                {t('sendMessage')}
              </>
            )}
          </Button>

          {/* Form Footer */}
          <p className="text-xs text-gray-500 text-center mt-4">
            {t('formFooter')}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
