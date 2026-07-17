import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Timestamp;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean;
  createdAt: Timestamp;
}

export interface Vehicle {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  description: string;
  imageUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Review {
  id: string;
  vehicleId: string;
  userId: string;
  title: string;
  content: string;
  rating: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id: string;
  reviewId: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  vehicleId?: string;
  content: string;
  isRead: boolean;
  createdAt: Timestamp;
}

// Users
export async function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export async function getUser(userId: string): Promise<User | null> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as User;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

// Subscription Plans
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const q = query(
      collection(db, "subscriptionPlans"),
      where("isActive", "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SubscriptionPlan[];
  } catch (error) {
    console.error("Error getting plans:", error);
    throw error;
  }
}

export async function createSubscriptionPlan(planData: Omit<SubscriptionPlan, "id">) {
  try {
    const docRef = await addDoc(collection(db, "subscriptionPlans"), planData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating plan:", error);
    throw error;
  }
}

// Subscriptions
export async function createSubscription(subscriptionData: Omit<Subscription, "id">) {
  try {
    const docRef = await addDoc(collection(db, "subscriptions"), {
      ...subscriptionData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  try {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("isActive", "==", true)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Subscription;
  } catch (error) {
    console.error("Error getting subscription:", error);
    throw error;
  }
}

// Vehicles
export async function submitVehicle(vehicleData: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) {
  try {
    const docRef = await addDoc(collection(db, "vehicles"), {
      ...vehicleData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting vehicle:", error);
    throw error;
  }
}

export async function getApprovedVehicles(): Promise<Vehicle[]> {
  try {
    const q = query(
      collection(db, "vehicles"),
      where("status", "==", "approved")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Vehicle[];
  } catch (error) {
    console.error("Error getting vehicles:", error);
    throw error;
  }
}

export async function getVehicle(vehicleId: string): Promise<Vehicle | null> {
  try {
    const docRef = doc(db, "vehicles", vehicleId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Vehicle;
  } catch (error) {
    console.error("Error getting vehicle:", error);
    throw error;
  }
}

// Reviews
export async function createReview(reviewData: Omit<Review, "id" | "createdAt" | "updatedAt">) {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...reviewData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

export async function getVehicleReviews(vehicleId: string): Promise<Review[]> {
  try {
    const q = query(
      collection(db, "reviews"),
      where("vehicleId", "==", vehicleId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
}

// Comments
export async function createComment(commentData: Omit<Comment, "id" | "createdAt" | "updatedAt">) {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      ...commentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function getReviewComments(reviewId: string): Promise<Comment[]> {
  try {
    const q = query(
      collection(db, "comments"),
      where("reviewId", "==", reviewId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Comment[];
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
}

// Messages
export async function sendMessage(messageData: Omit<Message, "id" | "createdAt">) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...messageData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function getUserMessages(userId: string): Promise<Message[]> {
  try {
    const q = query(
      collection(db, "messages"),
      where("recipientId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
}
