"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import AnimatedSection from "@/components/animated-section"
import { MessageSquare, ThumbsUp, Clock, User, Send, Plus, X, Filter, TrendingUp, MessageCircle, Search, Sparkles } from "lucide-react"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  likes: number
  liked: boolean
}

interface Topic {
  id: number
  title: string
  author: string
  category: string
  content: string
  date: string
  likes: number
  liked: boolean
  comments: Comment[]
}

const initialTopics: Topic[] = [
  {
    id: 1,
    title: "2024 BMW M5 mi yoksa Mercedes AMG E63 mi?",
    author: "AhmetK",
    category: "Karşılaştırma",
    content: "Yeni nesil BMW M5 ve Mercedes AMG E63 arasında kaldım. Günlük kullanım ve performans açısından hangisini önerirsiniz? Özellikle yakıt tüketimi ve bakım maliyetleri konusunda deneyimlerinizi paylaşır mısınız?",
    date: "2 saat önce",
    likes: 24,
    liked: false,
    comments: [
      {
        id: 1,
        author: "MehmetY",
        content: "BMW M5 kesinlikle daha sportif bir sürüş sunuyor. xDrive sistemi de çok başarılı.",
        date: "1 saat önce",
        likes: 8,
        liked: false
      },
      {
        id: 2,
        author: "AyseD",
        content: "Mercedes AMG E63 iç mekân kalitesi ve konforu açısından bir adım önde bence.",
        date: "45 dk önce",
        likes: 5,
        liked: false
      }
    ]
  },
  {
    id: 2,
    title: "Elektrikli araçlara geçiş yapmalı mıyız?",
    author: "CanS",
    category: "Genel",
    content: "Türkiye'deki şarj altyapisi ve elektrikli araç fiyatlari düşünüldüğünde, su an elektrikli araça geçmek mantikli mi? Deneyimlerinizi ve düşüncelerinizi merak ediyorum.",
    date: "5 saat önce",
    likes: 42,
    liked: false,
    comments: [
      {
        id: 1,
        author: "ElektrikFan",
        content: "Ben 2 yıldır Tesla Model 3 kullaniyorum. Şehir içi icin mükemmel ama uzun yolda hala sıkıntılar var.",
        date: "4 saat önce",
        likes: 15,
        liked: false
      }
    ]
  },
  {
    id: 3,
    title: "Porsche 911 GT3 Track Day Deneyimi",
    author: "PistKrali",
    category: "Deneyim",
    content: "Geçen hafta İstanbul Park'ta 911 GT3 ile pist günü yaptim. İnanılmaz bir deneyimdi! Merak edenler için detaylı izlenimlerimi paylaşmak istedim.",
    date: "1 gün önce",
    likes: 67,
    liked: false,
    comments: [
      {
        id: 1,
        author: "SpeedDemon",
        content: "Hangi lastikleri kullandın? PDK mi manual mi?",
        date: "20 saat önce",
        likes: 3,
        liked: false
      },
      {
        id: 2,
        author: "PistKrali",
        content: "Michelin Pilot Sport Cup 2 lastikler vardı, PDK versiyonuydu. Lap zamanı 1:58 çıkardım!",
        date: "18 saat önce",
        likes: 12,
        liked: false
      }
    ]
  },
  {
    id: 4,
    title: "Klasik araba restorasyonu - nereden başlamalı?",
    author: "KlasikAşığı",
    category: "Restorasyon",
    content: "1970 model bir Murat 124 aldım ve restore etmek istiyorum. Daha önce restorasyon yapmış arkadaşlar, nereden baslamamii önerirsiniz? Bütçe ve zaman planlaması nasıl yapilmali?",
    date: "2 gün önce",
    likes: 31,
    liked: false,
    comments: []
  }
]

const categories = ["Tümü", "Genel", "Karşılaştırma", "Deneyim", "Restorasyon", "Teknik", "Satılık"]

export default function TartismalarPage() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [showNewTopicModal, setShowNewTopicModal] = useState(false)
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null)
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})
  const [newTopic, setNewTopic] = useState({ title: "", content: "", category: "Genel", author: "" })
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filteredTopics = topics.filter(t => {
    const matchesCategory = selectedCategory === "Tümü" || t.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleLikeTopic = (topicId: number) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          likes: topic.liked ? topic.likes - 1 : topic.likes + 1,
          liked: !topic.liked
        }
      }
      return topic
    }))
  }

  const handleLikeComment = (topicId: number, commentId: number) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          comments: topic.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                liked: !comment.liked
              }
            }
            return comment
          })
        }
      }
      return topic
    }))
  }

  const handleAddComment = (topicId: number) => {
    if (!newComment[topicId]?.trim()) return

    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          comments: [
            ...topic.comments,
            {
              id: topic.comments.length + 1,
              author: "Misafir",
              content: newComment[topicId],
              date: "Şimdi",
              likes: 0,
              liked: false
            }
          ]
        }
      }
      return topic
    }))
    setNewComment({ ...newComment, [topicId]: "" })
  }

  const handleCreateTopic = () => {
    if (!newTopic.title.trim() || !newTopic.content.trim() || !newTopic.author.trim()) return

    const topic: Topic = {
      id: topics.length + 1,
      title: newTopic.title,
      author: newTopic.author,
      category: newTopic.category,
      content: newTopic.content,
      date: "Şimdi",
      likes: 0,
      liked: false,
      comments: []
    }

    setTopics([topic, ...topics])
    setNewTopic({ title: "", content: "", category: "Genel", author: "" })
    setShowNewTopicModal(false)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#101c22]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

            <main className="flex-1 py-8">
              {/* Hero Section */}
              <AnimatedSection animation="fade-up">
                <div className="text-center mb-8 px-4">
                  <div className="inline-flex items-center gap-2 bg-[#0b95da]/10 text-[#0b95da] px-4 py-2 rounded-full mb-4">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">Topluluk Tartışmaları</span>
                  </div>
                  <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
                    Araba Tutkunları <span className="text-[#0b95da]">Forumu</span>
                  </h1>
                  <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                    Otomobil dünyası hakkında sorular sorun, deneyimlerinizi paylaşın ve 
                    diğer araba tutkunlarıyla tartışmalara katılın.
                  </p>
                  <button
                    onClick={() => setShowNewTopicModal(true)}
                    className="inline-flex items-center gap-2 bg-[#0b95da] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0b95da]/90 transition-all hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Yeni Konu Ac
                  </button>
                </div>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-4">
                  <div className="text-center p-4 bg-[#1b2327] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#0b95da] mb-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xl font-bold">{topics.length}</span>
                    </div>
                    <p className="text-sm text-gray-400">Aktif Konu</p>
                  </div>
                  <div className="text-center p-4 bg-[#1b2327] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#0b95da] mb-2">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-xl font-bold">{topics.reduce((acc, t) => acc + t.comments.length, 0)}</span>
                    </div>
                    <p className="text-sm text-gray-400">Toplam Yorum</p>
                  </div>
                  <div className="text-center p-4 bg-[#1b2327] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#0b95da] mb-2">
                      <User className="w-5 h-5" />
                      <span className="text-xl font-bold">156</span>
                    </div>
                    <p className="text-sm text-gray-400">Aktif Uye</p>
                  </div>
                  <div className="text-center p-4 bg-[#1b2327] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#0b95da] mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xl font-bold">{topics.reduce((acc, t) => acc + t.likes, 0)}</span>
                    </div>
                    <p className="text-sm text-gray-400">Toplam Begeni</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Search & Filter */}
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="px-4 mb-8">
                  <div className={`relative bg-[#1b2327] border-2 rounded-xl transition-all duration-300 ${
                    isSearchFocused ? "border-[#0b95da]" : "border-[#283339]"
                  }`}>
                    <div className="flex items-center p-4 gap-4">
                      <Search className={`w-5 h-5 ${isSearchFocused ? "text-[#0b95da]" : "text-gray-400"}`} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Konu, yazar veya anahtar kelime ara..."
                        className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-[#283339] rounded">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                    <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                          selectedCategory === category
                            ? "bg-[#0b95da] text-white"
                            : "bg-[#1b2327] text-gray-400 hover:bg-[#283339]"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Topics */}
              <div className="px-4 space-y-4">
                {filteredTopics.map((topic, index) => (
                  <AnimatedSection key={topic.id} animation="fade-up" delay={index * 100}>
                    <div className="bg-[#1b2327] border border-[#283339] rounded-xl overflow-hidden hover:border-[#0b95da]/50 transition-colors">
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-[#0b95da]/10 text-[#0b95da] text-xs font-medium rounded">
                                {topic.category}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {topic.date}
                              </span>
                            </div>
                            <h3
                              className="text-lg font-bold text-white hover:text-[#0b95da] cursor-pointer transition-colors"
                              onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                            >
                              {topic.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">{topic.content}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleLikeTopic(topic.id)}
                              className={`flex items-center gap-1 text-sm ${topic.liked ? "text-[#0b95da]" : "text-gray-400"} hover:text-[#0b95da] transition-colors`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                              {topic.likes}
                            </button>
                            <button
                              onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              <MessageSquare className="w-4 h-4" />
                              {topic.comments.length} Yorum
                            </button>
                          </div>
                          <span className="text-sm text-gray-500">@{topic.author}</span>
                        </div>
                      </div>

                      {/* Comments */}
                      {expandedTopic === topic.id && (
                        <div className="border-t border-[#283339] bg-[#151e23]">
                          <div className="p-4 space-y-4">
                            {topic.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <div className="w-8 h-8 bg-[#0b95da]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-[#0b95da]" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white text-sm font-medium">@{comment.author}</span>
                                    <span className="text-gray-500 text-xs">{comment.date}</span>
                                  </div>
                                  <p className="text-gray-400 text-sm">{comment.content}</p>
                                  <button
                                    onClick={() => handleLikeComment(topic.id, comment.id)}
                                    className={`flex items-center gap-1 mt-2 text-xs ${comment.liked ? "text-[#0b95da]" : "text-gray-500"} hover:text-[#0b95da] transition-colors`}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    {comment.likes}
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* Add Comment */}
                            <div className="flex gap-3 pt-4 border-t border-[#283339]">
                              <input
                                type="text"
                                value={newComment[topic.id] || ""}
                                onChange={(e) => setNewComment({ ...newComment, [topic.id]: e.target.value })}
                                placeholder="Yorum yaz..."
                                className="flex-1 bg-[#1b2327] text-white text-sm px-4 py-2 rounded-lg border border-[#283339] focus:border-[#0b95da] focus:outline-none"
                              />
                              <button
                                onClick={() => handleAddComment(topic.id)}
                                className="px-4 py-2 bg-[#0b95da] text-white rounded-lg hover:bg-[#0b95da]/90 transition-colors"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* New Topic Modal */}
              {showNewTopicModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                  <div className="bg-[#1b2327] w-full max-w-lg rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-white text-xl font-bold">Yeni Konu Ac</h2>
                      <button onClick={() => setShowNewTopicModal(false)} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Kullanici Adi</label>
                        <input
                          type="text"
                          value={newTopic.author}
                          onChange={(e) => setNewTopic({ ...newTopic, author: e.target.value })}
                          className="w-full bg-[#101c22] text-white px-4 py-3 rounded-lg border border-[#283339] focus:border-[#0b95da] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Baslik</label>
                        <input
                          type="text"
                          value={newTopic.title}
                          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                          className="w-full bg-[#101c22] text-white px-4 py-3 rounded-lg border border-[#283339] focus:border-[#0b95da] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Kategori</label>
                        <select
                          value={newTopic.category}
                          onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                          className="w-full bg-[#101c22] text-white px-4 py-3 rounded-lg border border-[#283339] focus:border-[#0b95da] focus:outline-none"
                        >
                          {categories.filter(c => c !== "Tümü").map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Icerik</label>
                        <textarea
                          value={newTopic.content}
                          onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                          rows={4}
                          className="w-full bg-[#101c22] text-white px-4 py-3 rounded-lg border border-[#283339] focus:border-[#0b95da] focus:outline-none resize-none"
                        />
                      </div>
                      <button
                        onClick={handleCreateTopic}
                        className="w-full bg-[#0b95da] text-white py-3 rounded-lg font-semibold hover:bg-[#0b95da]/90 transition-colors"
                      >
                        Konuyu Olustur
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
