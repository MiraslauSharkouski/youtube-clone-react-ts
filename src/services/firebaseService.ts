import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Video } from "../types";

// 🔑 Firebase config (замените на свой из Firebase Console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 🔐 Авторизация через Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return null;
  }
};

// 🔐 Выход
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Ошибка выхода:", error);
  }
};

// 📦 Добавление комментария
const addComment = async (videoId: string, user: User, text: string) => {
  try {
    await addDoc(collection(db, "comments"), {
      videoId,
      userId: user.uid,
      author: user.displayName,
      authorPhoto: user.photoURL,
      text,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
  }
};

// 📦 Получение комментариев
const getCommentsByVideoId = async (videoId: string) => {
  const q = query(collection(db, "comments"), where("videoId", "==", videoId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

// 📦 Удаление комментария (по желанию)
const deleteComment = async (commentId: string) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
  } catch (error) {
    console.error("Ошибка удаления комментария:", error);
  }
};

// 📦 Подписка на изменения авторизации
const onAuthChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};

// Добавление видео в избранное
const addToFavorites = async (userId: string, video: Video) => {
  const favoritesRef = collection(db, "users", userId, "favorites");
  await addDoc(favoritesRef, {
    ...video,
    timestamp: new Date(),
  });
};

// Удаление из избранного
const removeFromFavorites = async (userId: string, videoId: string) => {
  const favoritesRef = collection(db, "users", userId, "favorites");
  const q = query(favoritesRef, where("id", "==", videoId));
  const snapshot = await getDocs(q);
  snapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

// Получение избранного
const getFavorites = async (userId: string): Promise<Video[]> => {
  const favoritesRef = collection(db, "users", userId, "favorites");
  const snapshot = await getDocs(favoritesRef);
  return snapshot.docs.map((doc) => doc.data() as Video);
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  onAuthChange,
  addComment,
  getCommentsByVideoId,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
