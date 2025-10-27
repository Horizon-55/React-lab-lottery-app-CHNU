# React Lottery App - Lab 7 Enhancements

## Огляд змін

Цей проєкт - розширена версія React Lottery App з Lab 6, яка включає:

- Модульну архітектуру з переиспользуємими компонентами
- SCSS стилізацію з селективним імпортом Bootstrap
- LocalStorage для збереження даних
- Модальні вікна для редагування/видалення
- Сортування та фільтрацію учасників
- Покращену валідацію з перевіркою унікальності email
- Підтримку клавіатурних подій (Enter, Esc)

## Структура проєкту

```
src/
├── components/
│   ├── ui/                         # Переиспользуємі UI компоненти
│   │   ├── Button.tsx              # Універсальна кнопка
│   │   ├── Button.module.scss      # Стилі кнопки
│   │   ├── Input.tsx               # Універсальне поле вводу
│   │   ├── Input.module.scss       # Стилі input
│   │   ├── Modal.tsx               # Модальне вікно
│   │   └── Modal.module.scss       # Стилі модалки
│   ├── WinnerItem.tsx              # Компонент одного переможця
│   ├── WinnerItem.module.scss      # Стилі переможця
│   ├── WinnersList.tsx             # Список переможців
│   ├── SearchBar.tsx               # Пошук учасників
│   ├── SearchBar.module.scss       # Стилі пошуку
│   ├── RegisterForm.tsx            # Форма реєстрації
│   ├── ParticipantsTable.tsx       # Таблиця учасників
│   ├── ParticipantsTable.module.scss # Стилі таблиці
│   ├── EditParticipantModal.tsx    # Модалка редагування
│   └── DeleteConfirmModal.tsx      # Модалка підтвердження видалення
├── hooks/
│   └── useLocalStorage.ts          # Custom hook для localStorage
├── styles/
│   ├── variables.scss              # SCSS змінні (кольори, розміри)
│   ├── mixins.scss                 # SCSS mixins
│   ├── bootstrap-custom.scss       # Селективний імпорт Bootstrap
│   └── global.scss                 # Глобальні стилі
├── types/
│   └── Participant.ts              # TypeScript типи
├── utils/
│   └── validation.ts               # Функції валідації
├── App.tsx                         # Головний компонент
└── main.tsx                        # Точка входу
```

## Нові функції

### 1. SCSS Модульна стилізація

**Переваги:**

- Селективний імпорт Bootstrap (тільки потрібні модулі)
- CSS Modules для ізоляції стилів компонентів
- Змінні та mixins для консистентності
- Менший розмір bundle

**Використання:**

```scss
// variables.scss
$primary-color: #17a2b8;

// mixins.scss
@mixin button-variant($bg-color, $hover-color) {
  // ...
}

// Button.module.scss
@import "../../styles/variables";
@import "../../styles/mixins";

.button {
  @include button-variant($primary-color, $primary-hover);
}
```

### 2. Переиспользуємі UI компоненти

#### Button Component

```tsx
<Button variant="info" size="small" onClick={handleClick}>
  Click me
</Button>
```

**Props:**

- `variant`: 'primary' | 'danger' | 'info'
- `size`: 'normal' | 'small'
- `fullWidth`: boolean
- `disabled`: boolean

#### Input Component

```tsx
<Input
  label="Email"
  value={email}
  onChange={handleChange}
  error={emailError}
  isValid={isEmailValid}
/>
```

**Props:**

- `label`: string
- `error`: string | undefined
- `isValid`: boolean
- Всі стандартні HTML input атрибути

#### Modal Component

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Edit Participant"
  footer={<>...</>}
>
  {/* Вміст модального вікна */}
</Modal>
```

**Особливості:**

- Автоматичне закриття на Esc
- Закриття при кліку на backdrop
- Блокування scroll body при відкритті
- CSS анімації

### 3. LocalStorage Integration

**useLocalStorage Hook:**

```tsx
const [data, setData] = useLocalStorage<Type>("key", initialValue);
```

**Особливості:**

- Автоматична синхронізація з localStorage
- TypeScript типізація
- Обробка помилок
- Працює як useState, але з персистентністю

### 4. Редагування учасника

**Функціонал:**

- Кнопка "Edit" для кожного учасника в таблиці
- Модальне вікно з попередньо заповненою формою
- Повна валідація всіх полів
- Перевірка унікальності email (виключаючи поточний)
- Оновлення даних в таблиці та переможцях

### 5. Видалення учасника

**Функціонал:**

- Кнопка "Delete" для кожного учасника
- Модальне вікно підтвердження
- Відображення імені та email учасника
- Автоматичне видалення з переможців

### 6. Сортування

**Можливості:**

- Сортування за іменем (A-Z)
- Сортування за датою народження
- Toggle напрямку (asc/desc)
- Візуальні індикатори напрямку (↓ ↑ ↕)

**Використання:**

- Клік на іконку біля заголовка колонки
- Перший клік - сортування за зростанням
- Другий клік - сортування за спаданням

### 7. Фільтрація

**SearchBar компонент:**

- Case-insensitive пошук за іменем
- Реактивне оновлення таблиці
- useMemo для оптимізації

### 8. Унікальність Email

**Валідація:**

- Перевірка при додаванні нового учасника
- Перевірка при редагуванні (виключаючи поточний email)
- Показ помилки: "This email is already taken."

### 9. Клавіатурні події

**Enter для форми:**

- Натискання Enter в будь-якому полі форми - submit
- Використання `form.requestSubmit()` для тригера валідації

**Esc для модальних вікон:**

- useEffect з window.addEventListener
- Автоматичний cleanup при unmount
- Блокування scroll body

## React Hooks еквіваленти Vue Composition API

Цей проєкт демонструє використання **React Hooks** як еквівалент **Vue Composition API**:

| Vue Composition API | React Hooks               | Використання в проєкті                   |
| ------------------- | ------------------------- | ---------------------------------------- |
| `ref()`             | `useState()`              | formData, winners, participants          |
| `reactive()`        | `useState()` з об'єктом   | formData в RegisterForm                  |
| `computed()`        | `useMemo()`               | filteredParticipants, sortedParticipants |
| `watch()`           | `useEffect()`             | localStorage sync, keyboard events       |
| `onMounted()`       | `useEffect(() => {}, [])` | Завантаження з localStorage              |
| `onUnmounted()`     | `useEffect cleanup`       | Cleanup keyboard listeners               |

### Custom Hooks (Composables)

**useLocalStorage:**

- Аналог Vue composable для localStorage
- Інкапсулює логіку збереження/завантаження
- Переиспользуємий між компонентами

## Встановлення та запуск

### 1. Встановіть залежності:

```bash
npm install
```

Основні залежності:

- `react` ^19.1.1
- `bootstrap` ^5.x
- `sass` ^1.x (dev dependency)

### 2. Запустіть проєкт:

```bash
npm run dev
```

### 3. Відкрийте в браузері:

```
http://localhost:5173
```

## Використання застосунку

### Реєстрація учасника

1. Заповніть всі поля форми:

   - **Name**: обов'язкове поле
   - **Date of Birth**: не може бути в майбутньому
   - **Email**: валідний формат + унікальність
   - **Phone**: формат `(123) 456-7890`

2. Натисніть "Save" або Enter
3. Учасник з'явиться в таблиці
4. Дані збережуться в localStorage

### Пошук учасників

- Введіть ім'я в SearchBar
- Таблиця фільтрується в реальному часі
- Пошук case-insensitive

### Сортування

- Клік на ↕ біля "Name" - сортування за іменем
- Клік на ↕ біля "Date of Birth" - сортування за датою
- Повторний клік змінює напрямок (↓ ↑)

### Редагування учасника

1. Натисніть "Edit" в колонці Actions
2. Модальне вікно з даними учасника
3. Відредагуйте потрібні поля
4. Натисніть "Update Data"
5. Модалка закриється автоматично
6. Натисніть Esc для скасування

### Видалення учасника

1. Натисніть "Delete" в колонці Actions
2. Підтвердіть видалення в модальному вікні
3. Натисніть "Yes" для видалення
4. Учасник видалиться з таблиці та переможців
5. Натисніть "No" або Esc для скасування

### Вибір переможця

1. Натисніть "New winner"
2. Випадковий учасник додається до списку
3. Максимум 3 переможці
4. Кнопка деактивується при 3 переможцях або без учасників

### Видалення переможця

- Натисніть × біля імені переможця
- Переможець видалиться зі списку (але залишиться в таблиці)

## Технічні деталі

### TypeScript

Повна типізація всіх компонентів:

```tsx
interface RegisterFormProps {
  onAddParticipant: (participant: Omit<Participant, "id">) => void;
  existingParticipants: Participant[];
}
```

### Props передача

**React props** = **Vue props**:

```tsx
// Батьківський компонент
<ParticipantsTable
  participants={filteredParticipants}
  onEdit={setEditingParticipant}
  onDelete={setDeletingParticipant}
/>;

// Дочірній компонент
interface ParticipantsTableProps {
  participants: Participant[];
  onEdit: (participant: Participant) => void;
  onDelete: (participant: Participant) => void;
}
```

### Events (Callback props)

**React callback props** = **Vue events**:

```tsx
// Vue: $emit('filter-by-name', value)
// React: onChange(value)

<SearchBar
  value={searchQuery}
  onChange={setSearchQuery} // Callback function
/>
```

### Children (Slots)

**React children** = **Vue slots**:

```tsx
<Modal title="Delete">
  <p>Are you sure?</p> {/* children */}
</Modal>
```

## Оптимізація

### useMemo для фільтрації

```tsx
const filteredParticipants = useMemo(() => {
  if (!searchQuery) return participants;
  const query = searchQuery.toLowerCase();
  return participants.filter((p) => p.name.toLowerCase().includes(query));
}, [participants, searchQuery]);
```

### CSS Modules

- Автоматичне створення унікальних class names
- Уникнення конфліктів стилів
- Tree-shaking невикористаних стилів

### Селективний імпорт Bootstrap

Імпортуємо тільки потрібне:

- Forms
- Buttons
- Tables
- Grid
- Utilities

Результат: ~70% менший bundle розмір порівняно з повним Bootstrap

## Лінтинг

```bash
npm run lint
```

ESLint налаштований для:

- React Hooks rules
- TypeScript
- Accessibility (a11y)

## Build

```bash
npm run build
```

Production build з:

- Мінімізацією
- Tree-shaking
- SCSS компіляцією
- TypeScript type checking

## Автор

Виконано для лабораторної роботи №7 - React Lottery App Enhancement

## Ліцензія

MIT
