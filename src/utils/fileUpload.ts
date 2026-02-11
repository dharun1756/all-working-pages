import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (
    file: File,
    bucket: string,
    path?: string
): Promise<string | null> => {
    try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = path ? `${path}/${fileName}` : fileName;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) {
            console.error("Error uploading file:", uploadError);
            return null;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error("Error in uploadFile:", error);
        return null;
    }
};
