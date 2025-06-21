'use client'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, MapPin, ExternalLink, Star, Users, UserPlus, Activity } from "lucide-react"
import ContactForm from "./components/contact-form"
import { ThemeToggle } from "@/components/theme-toggle"
import React from "react"
import Image from "next/image"
import { useTranslation } from 'react-i18next'
import i18n from '../lib/i18n'
import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts').then(mod => mod.default), { ssr: false })

export default function Portfolio() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/images (1).jpeg" alt="Logo" width={48} height={48} className="h-10 w-10 rounded-full object-cover" />
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                  {t('about')}
                </Link>
                <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
                  {t('skills')}
                </Link>
                <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
                  {t('projects')}
                </Link>
                <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </div>
              <ThemeToggle />
              <div className="flex gap-2 ml-2 px-2 py-1 rounded-xl border border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-lg">
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-2 py-0.5 rounded-md text-xs font-semibold transition-all duration-200
                    ${i18n.language === 'en'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon-glass scale-105'
                      : 'bg-white/30 dark:bg-black/30 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/30'}
                  `}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage('fr')}
                  className={`px-2 py-0.5 rounded-md text-xs font-semibold transition-all duration-200
                    ${i18n.language === 'fr'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon-glass scale-105'
                      : 'bg-white/30 dark:bg-black/30 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/30'}
                  `}
                >
                  FR
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        {isClient && (
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/Animated Background, Geek Gamer Room, Retro Video Games, Board Games, Game Console, Retro Boom.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto max-w-4xl text-center text-white flex flex-col items-center justify-center h-full">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 hidden md:flex">
              <Image src="/kim.jpg" alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              Mael Andria
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2 drop-shadow">{t('itEngineerFullStack')}</p>
            <div className="flex items-center justify-center text-white/80 mb-8">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{t('eniFianarantsoaMadagascar')}</span>
            </div>
          </div>

          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto drop-shadow">
            {t('heroDescription')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600">
              <Link href="#projects">{t('viewMyWork')}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-black dark:text-white hover:bg-white/10">
              <Link href="https://github.com/KimADR" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-br from-black via-blue-950 to-purple-950 relative overflow-hidden">
        {/* Animated grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 z-0" />
        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow-neon">{t('aboutMe')}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">{t('educationBackground')}</h3>
              <p className="text-white/80 mb-4">
                {t('aboutParagraph1')}
              </p>
              <p className="text-white/70 mb-6">
                {t('aboutParagraph2')}
              </p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">🎓</Badge>
                  <span className="text-white/80">{t('generalITMajor')}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">💻</Badge>
                  <span className="text-white/80">{t('fullStackDeveloper')}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">🎨</Badge>
                  <span className="text-white/80">{t('webDesigner')}</span>
                </div>
              </div>
            </div>

            <Card className="bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl max-w-3xl mx-auto p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-purple-400">{t('githubStats')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Public Repositories */}
                <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-black/20 rounded-2xl py-2 px-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1 mb-1">
                    <Github className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-200">18</div>
                  <div className="text-sm text-blue-700/80 dark:text-blue-200/80 mt-1 text-center">{t('publicRepositories')}</div>
                </div>
                {/* Followers */}
                <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-black/20 rounded-2xl py-2 px-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mb-1">
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-green-700 dark:text-green-200">4</div>
                  <div className="text-sm text-green-700/80 dark:text-green-200/80 mt-1 text-center">{t('followers')}</div>
                </div>
                {/* Following */}
                <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-black/20 rounded-2xl py-2 px-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-1 mb-1">
                    <UserPlus className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-yellow-700 dark:text-yellow-200">3</div>
                  <div className="text-sm text-yellow-700/80 dark:text-yellow-200/80 mt-1 text-center">{t('following')}</div>
                </div>
                {/* Contributions Last Year */}
                <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-black/20 rounded-2xl py-2 px-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-1 mb-1">
                    <Activity className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-purple-700 dark:text-purple-200">93</div>
                  <div className="text-sm text-purple-700/80 dark:text-purple-200/80 mt-1 text-center">{t('contributionsLastYear')}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-gradient-to-br from-blue-950 via-black to-purple-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10 z-0" />
        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow-neon">{t('technicalSkills')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-500/60 bg-white/10 backdrop-blur-md hover:border-blue-400 shadow-neon-glass transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-300">
                  <div className="w-8 h-8 bg-blue-500 rounded mr-3 flex items-center justify-center shadow-neon">
                    <span className="text-white text-sm font-bold">FE</span>
                  </div>
                  {t('frontendDevelopment')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">TypeScript</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">React</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">Next.js</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">HTML5</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">CSS3</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">Tailwind CSS</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">JavaScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/60 bg-white/10 backdrop-blur-md hover:border-green-400 shadow-neon-glass transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-green-300">
                  <div className="w-8 h-8 bg-green-500 rounded mr-3 flex items-center justify-center shadow-neon">
                    <span className="text-white text-sm font-bold">BE</span>
                  </div>
                  {t('backendDevelopment')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">Node.js</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">Express.js</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">Python</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">PHP</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">MySQL</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">MongoDB</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-neon">REST APIs</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500/60 bg-white/10 backdrop-blur-md hover:border-purple-400 shadow-neon-glass transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <div className="w-8 h-8 bg-purple-500 rounded mr-3 flex items-center justify-center shadow-neon">
                    <span className="text-white text-sm font-bold">DT</span>
                  </div>
                  {t('desktopTools')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">Electron</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">Java</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">C++</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">Git</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">Docker</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">VS Code</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-neon">Figma</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-gradient-to-br from-black via-purple-950 to-blue-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10 z-0" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow-neon">{t('featuredProjects')}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Project from GitHub */}
            <Card className="border-2 border-blue-400/60 dark:border-blue-800 bg-white/10 backdrop-blur-md hover:shadow-neon-glass hover:border-blue-500 transition-shadow transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-blue-300 break-words max-w-[70%] truncate">
                    <Github className="w-5 h-5 mr-2" />
                    {t('frontendSchoolManagement')}
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">{t('featured')}</Badge>
                </div>
                <CardDescription className="text-white/70">
                  {t('schoolManagementDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1 shadow-neon"></div>
                      {t('typeScript')}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />1
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    {t('modernSchoolDesc')}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" asChild className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-neon">
                      <Link
                        href="https://github.com/KimADR/Frontend_School_management"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t('viewCode')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Project Examples */}
            <Card className="hover:shadow-neon-glass hover:border-yellow-400 border-2 border-yellow-400/40 bg-white/10 backdrop-blur-md transition-shadow transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-300">
                  <Github className="w-5 h-5 mr-2" />
                  {t('ecommercePlatform')}
                </CardTitle>
                <CardDescription className="text-white/70">{t('ecommerceDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1 shadow-neon"></div>
                      {t('javaScript')}
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1 shadow-neon"></div>
                      {t('react')}
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    {t('completeOnlineShopping')}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild className="border-yellow-400 text-black dark:text-yellow-200 hover:bg-yellow-400/10">
                      <Link href="https://github.com/KimADR" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t('viewCode')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-neon-glass hover:border-green-400 border-2 border-green-400/40 bg-white/10 backdrop-blur-md transition-shadow transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-green-300">
                  <Github className="w-5 h-5 mr-2" />
                  {t('taskManagementApp')}
                </CardTitle>
                <CardDescription className="text-white/70">{t('taskManagementDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-1 shadow-neon"></div>
                      {t('python')}
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-1 shadow-neon"></div>
                      {t('electron')}
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    {t('crossPlatformApp')}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild className="border-green-400 text-black dark:text-green-200 hover:bg-green-400/10">
                      <Link href="https://github.com/KimADR" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t('viewCode')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild className="border-white text-black dark:text-white hover:bg-white/10">
              <Link href="https://github.com/KimADR?tab=repositories" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {t('viewAllProjects')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-blue-950 via-black to-purple-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10 z-0" />
        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow-neon">{t('getInTouch')}</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center h-full">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border-2 border-purple-500/40 shadow-neon-glass p-8 flex flex-col justify-center h-full">
              <p className="text-purple-300 mb-8 text-2xl font-bold md:text-3xl md:mb-10">
                {t('letsConnect')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <Link href="mailto:andriamahatoky.mael2020@gmail.com" className="hover:underline text-white/90">
                    andriamahatoky.mael2020@gmail.com
                  </Link>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-white/90">{t('fianarantsoaMadagascar')}</span>
                </div>
                <div className="flex items-center">
                  <Github className="w-5 h-5 mr-3 text-blue-400" />
                  <Link
                    href="https://github.com/KimADR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-white/90"
                  >
                    github.com/KimADR
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="w-5 h-5 mr-3 text-blue-400 font-bold flex items-center justify-center">in</span>
                  <Link
                    href="https://www.linkedin.com/in/mael-andriamahatoky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-white/90"
                  >
                    linkedin.com/in/mael-andriamahatoky
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="w-5 h-5 mr-3 text-blue-400 font-bold flex items-center justify-center">f</span>
                  <Link
                    href="https://web.facebook.com/kim.andriamahatoky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-white/90"
                  >
                    facebook.com/kim.andriamahatoky
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center h-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('copyright') }} />
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/KimADR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:andriamahatoky.mael2020@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
