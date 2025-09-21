# Button Components Usage Guide

This project includes enhanced button components with consistent styling and loading states.

## Button Component

### Basic Usage

```tsx
import { Button } from '@/components/ui/button';

// Primary button (default)
<Button onClick={handleClick}>Click me</Button>

// Different variants
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="success">Success</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading={isLoading}>Save Project</Button>

// Full width
<Button className="w-full">Full Width</Button>
```

### Props

- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success"
- `size`: "default" | "sm" | "lg" | "icon"
- `loading`: boolean - Shows spinner and disables button
- `disabled`: boolean - Disables the button
- `className`: string - Additional CSS classes

## IconButton Component

### Basic Usage

```tsx
import { IconButton } from '@/components/ui/button';

<IconButton 
  icon={<span className="material-symbols-outlined">edit</span>}
  onClick={handleEdit}
  tooltip="Edit item"
/>

// Different variants
<IconButton 
  icon={<span className="material-symbols-outlined">delete</span>}
  variant="destructive"
  tooltip="Delete item"
/>

// Different sizes
<IconButton 
  icon={<span className="material-symbols-outlined">add</span>}
  size="lg"
/>

// Loading state
<IconButton 
  icon={<span className="material-symbols-outlined">save</span>}
  loading={isSaving}
/>
```

### Props

- `icon`: React.ReactNode - The icon to display
- `variant`: "primary" | "secondary" | "danger" | "ghost"
- `size`: "sm" | "md" | "lg"
- `loading`: boolean - Shows spinner instead of icon
- `tooltip`: string - Tooltip text on hover

## Examples in Project

### Project Management

The ProjectManagement component uses these buttons for:

- **Primary actions**: "新建项目" (New Project)
- **Secondary actions**: "编辑" (Edit) buttons on project cards
- **Destructive actions**: "删除" (Delete) buttons
- **Form actions**: "取消" (Cancel) and "创建项目" (Create Project) in modals

### Form Buttons

```tsx
// Modal form buttons
<div className="flex gap-4">
  <Button
    type="button"
    onClick={() => setIsModalOpen(false)}
    variant="outline"
    className="flex-1"
  >
    取消
  </Button>
  <Button
    type="submit"
    loading={isLoading}
    className="flex-1"
  >
    {editingProject ? '更新项目' : '创建项目'}
  </Button>
</div>
```

## Styling

The buttons use CSS variables for theming:

- `--primary-color`: Main brand color
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color

Colors are automatically adjusted for different variants and states.
