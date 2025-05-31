# Создание GitHub Token для Models API

## ⚠️ ВАЖНО: Используйте Fine-grained Token, НЕ Classic Token!

Ваш текущий токен `[REDACTED_CLASSIC_TOKEN]` является классическим токеном и НЕ имеет доступа к GitHub Models API.

## Пошаговая инструкция:

### 1. Откройте правильную страницу
🔗 **Ссылка**: https://github.com/settings/personal-access-tokens/new

### 2. Настройте Fine-grained token
- **Token name**: `Resume Helper AI Token`
- **Expiration**: выберите подходящий срок (30-90 дней)
- **Resource owner**: ваш аккаунт
- **Repository access**: 
  - ✅ **Selected repositories** 
  - Выберите любой публичный репозиторий (или создайте новый)

### 3. Permissions (КРИТИЧЕСКИ ВАЖНО!)
В разделе **Permissions** найдите и включите:
- ✅ **Account permissions** → **GitHub Models** → **Read**

### 4. Сгенерировать токен
- Нажмите "Generate token"
- Скопируйте токен (формат: `github_pat_11XXXXX...`)

### 5. Обновить .env.local
Замените GITHUB_TOKEN в файле `.env.local`:
```bash
GITHUB_TOKEN=github_pat_11ВАША_НОВАЯ_ПОСЛЕДОВАТЕЛЬНОСТЬ
```

### 6. Протестировать
```bash
node test-github-models.mjs
```

## 🎯 Ожидаемый результат:
```
✅ Success! Response:
---
Hello! I'm working via GitHub Models and ready to help with your Resume Helper application!
---
🎉 GitHub Models integration is working perfectly!
```

## 📞 Альтернативные варианты:
1. **Azure OpenAI** (уже настроен, но нужны deployments)
2. **Обычный OpenAI API** (требует личный API ключ)

## 🚀 После успешной настройки:
Ваш Resume Helper будет полностью функционален с AI возможностями!

---
**Текущий статус**: Ждем правильный GitHub token с разрешением "models"
