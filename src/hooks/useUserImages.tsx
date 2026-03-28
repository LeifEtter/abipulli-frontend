import { Image } from "abipulli-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageApi } from "src/api/endpoints/image";
import { useSnackbar } from "src/providers/snackbarProvider";

export const useUserImages = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  const {
    data: userImages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userImages"],
    queryFn: async () => {
      const images: Image[] = await ImageApi.fetchUsersImages();
      return images.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
  });

  const uploadImage = useMutation({
    mutationFn: async (file: File) => {
      return await ImageApi.upload(file);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userImages"] });
    },
    onError: () => {
      showSnackbar({ message: "Bild hochladen fehlgeschlagen", type: "error" });
    },
  });

  const deleteImage = useMutation({
    mutationFn: async (imageId: number) => {
      await ImageApi.delete(imageId);
    },
    onMutate: async (imageId) => {
      await queryClient.cancelQueries({ queryKey: ["userImages"] });
      const previous = queryClient.getQueryData<Image[]>(["userImages"]);
      queryClient.setQueryData<Image[]>(["userImages"], (old = []) =>
        old.filter((img) => img.id !== imageId),
      );
      return { previous };
    },
    onError: (_err, _imageId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["userImages"], context.previous);
      }
      showSnackbar({ message: "Bild löschen fehlgeschlagen", type: "error" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userImages"] });
    },
  });

  return {
    userImages,
    userImagesAreLoading: isLoading,
    userImagesError: error ? "Couldn't fetch User Images" : null,
    uploadImage: uploadImage.mutateAsync,
    isUploadingImage: uploadImage.isPending,
    deleteImage: deleteImage.mutateAsync,
  };
};
