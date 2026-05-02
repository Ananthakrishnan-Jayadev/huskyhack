export const playerImageExtensions = ['png', 'jpg', 'jpeg'] as const;

export function getPlayerImageSrc(playerId: string, extensionIndex = 0) {
  const extension = playerImageExtensions[extensionIndex] ?? playerImageExtensions[0];

  return `/players/${playerId}.${extension}`;
}
