# Персональный сайт разработчика

Чистый HTML/CSS/JS, без сборки. Работает на GitHub Pages.

## Что поменять
- `js/app.js`, верхний блок: `CFG` (имя, ник GitHub, email, фото, текст на главной), `ABOUT`, `FACTS`, `LINKS`, `SKILLS`, `PROJECTS`
- `assets/`: твоё фото и скриншоты/GIF проектов (пути указываются в `CFG.photo` и `PROJECTS[].img`)
- `index.html`: только `<title>`

## Новый пост в блоге
Создай файл `blog/posts/название.md`:

    ---
    title: Заголовок
    date: 2026-10-01
    description: Короткое описание
    ---
    Текст в Markdown.

Если в `CFG.repo` указано `"ник/репозиторий"`, пост подхватится сам. Если пусто, добавь имя файла в `blog/posts/index.json`.

Два файла в `blog/posts/` — примеры, удали или замени их.

## Публикация
Settings → Pages → Deploy from a branch → `main` / `(root)`.
