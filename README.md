# 🔁 Reactive - 响应式系统核心实现 | リアクティブシステムのコア実装 | Core Reactive System

## 🧩 项目简介 | プロジェクト概要 | Project Overview

本项目是一个通过 `Proxy` 实现的最小响应式系统，模拟了 Vue 3 的响应式原理，包括依赖收集、触发更新、effect 函数栈等机制，适合作为学习 Vue 内部机制的示例项目。

Vue 3 のリアクティブシステムを模倣した JavaScript 実装です。`Proxy` を利用して、依存関係の収集や更新トリガー、`effect` の管理などを再現しています。Vue の内部構造を学ぶための教材にもなります。

This is a minimal reactive system built using JavaScript `Proxy`, simulating Vue 3's reactivity core: dependency tracking, triggering updates, and effect stack. A useful project for learning how Vue works under the hood.

---

## ⚙️ 实现特性 | 主な機能 | Key Features

- 使用 `Proxy` 实现响应式对象
- 利用 `Map` 和 `Set` 构建依赖收集结构
- 模拟 `effect` 栈收集和触发依赖更新
- 简洁清晰的结构，便于理解响应式核心原理

- `Proxy` によるリアクティブオブジェクトの構築
- `Map` / `Set` を活用した依存関係の収集
- `effect` スタックを用いた更新トリガーのシミュレーション
- コード構成がシンプルで理解しやすい

- Reactive objects implemented with `Proxy`
- Dependency map using `Map` and `Set`
- Effect stack simulation for controlled tracking
- Clear and concise structure for learning reactivity

---

## 🚀 使用方式 | 使用方法 | Usage

```ts
import { reactive, effect } from "./reactive"

const state = reactive({ count: 0 })

effect(() => {
  console.log("Count changed:", state.count)
})

state.count++ // 自动触发依赖更新
```

## 📌 适用场景 | 使用例 | Use Cases

- 学习 Vue 3 响应式原理
- 面试演示/源码讲解辅助
- 构建轻量自定义状态管理库

- Vue 3 の内部学習教材
- 面接対策や技術解説用
- 軽量な状態管理ライブラリのベースとして

- Educational tool for Vue 3 internals
- Interview or tech talk demos
- Foundation for a lightweight state system

## 🧠 灵感来源 | 参考元 | Inspiration

- 本项目借鉴了 Vue 3 源码中响应式系统的核心设计思路，并通过简化后的版本加以实现，以便更易理解与演示。

- Vue 3 の reactivity モジュールの設計から着想を得て、シンプルに再構成しました。

- Inspired by Vue 3’s reactivity module, simplified for clarity and learning.
