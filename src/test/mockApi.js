import { setupWorker, rest } from "msw";

const stories = [
  {
    userId: "user1",
    userName: "User One",
    avatar: "avatar_url_1",
    stories: [
      {
        storyId: "story1",
        type: "image",
        content: "image_url_1",
        createdAt: "2024-07-07T12:34:56.000Z",
      },
      {
        storyId: "story2",
        type: "text",
        content: "Some text content",
        createdAt: "2024-07-07T12:45:00.000Z",
      },
    ],
  },
  {
    userId: "user2",
    userName: "User Two",
    avatar: "avatar_url_2",
    stories: [
      {
        storyId: "story3",
        type: "image",
        content: "image_url_2",
        createdAt: "2024-07-07T13:00:00.000Z",
      },
    ],
  },
];

const worker = setupWorker(
  rest.get("/api/stories", (req, res, ctx) => {
    return res(ctx.json(stories));
  })
);

worker.start();
