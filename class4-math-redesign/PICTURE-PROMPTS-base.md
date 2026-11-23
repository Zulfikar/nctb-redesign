# Picture prompts: the base (for the helpers' prompt files)

The pictures are made by the user in ChatGPT from our prompts, as for the Class 2 and Class 3 books. Every prompt file (`PICTURE-PROMPTS-pXXX-YYY.md`) builds on section 1; Claude gathers them into one kit for the user at the end.

## 1. The style (every picture)
- **The look:** a bright, friendly 2D children's book illustration with clean dark outlines, soft shading and warm colours, the same as the Class 2 and Class 3 books' pictures. Bangladeshi settings, clothes and faces.
- **No text, letters or digits anywhere:** no signs, labels, price tags, numbers on buses or shirts. Where the page needs words or numbers on a thing, ask for it plain; the build draws them.
- **রাফি and তুলি** (the boy and the girl who speak through the book) look exactly as in `ref-children.png`, attached with the prompt: রাফি has short black hair and a light-blue shirt; তুলি has two pigtails and a light-blue school shirt with a white collar. টিয়া is a green parakeet with a red beak (`face-parrot.png`).
- **Other people** are ordinary Bangladeshi children and grown-ups, never রাফি or তুলি unless the page says so.
- **Counts never come from ChatGPT:** a picture whose number of things matters is drawn by the build (`objs`), so a prompt never asks for "5 apples".
- **Shapes:**
  - a scene: landscape **1536 × 1024**, or portrait **1024 × 1536** when the book's picture is tall;
  - a sticker: square **1024 × 1024**, one object, centred, on a plain white background, no shadow, no ground.

## 2. How a prompt reads
Start with what the picture shows and who is in it, then the setting, then the shape and the rules:

```
A bright, friendly 2D children's book illustration with clean dark outlines, soft shading and warm colours.
<what it shows>. <the setting>.
Landscape 1536 × 1024. No text, letters or digits anywhere.
```
