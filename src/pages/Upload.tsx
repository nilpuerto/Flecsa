import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, Camera, FileText, Lightbulb, Eye, Frame, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiService } from "@/services/api";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, updateUser } = useAuth();

  // Show minimal loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleMultipleFiles = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
    
    const newUrls = files.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return "";
    });
    
    setPreviewUrls(prev => [...prev, ...newUrls]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleMultipleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const processDocuments = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setError("");
    setUploadProgress(0);

    try {
      let completed = 0;
      for (const file of selectedFiles) {
        const result = await apiService.uploadDocument(file);
        if (result.error) {
          // Friendly message for unsupported/unprocessed files
          throw new Error(`No se pudo procesar "${file.name}". Intenta con otro formato.`);
        }
        completed += 1;
        // suave: animar en pasos pequeños
        const target = Math.round((completed / selectedFiles.length) * 100);
        const current = uploadProgress;
        const step = current < target ? 1 : 0;
        if (step) {
          for (let p = current; p <= target; p += 1) {
            await new Promise(r => setTimeout(r, 15));
            setUploadProgress(p);
          }
        } else {
          setUploadProgress(target);
        }
      }
      
      // Clear selected files
      setSelectedFiles([]);
      setPreviewUrls([]);
      
      // Update storage usage locally so the header shows new %
      if (user) {
        const totalSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);
        updateUser({
          ...user,
          storageUsed: user.storageUsed + totalSize,
        });
      }
      
      // Quedarse en la página y mostrar confirmación breve
      await new Promise(r => setTimeout(r, 400));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error subiendo documentos');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Sube o haz una foto
          </h1>
          <p className="text-xl text-muted-foreground">
            Selecciona un documento para que la IA lo organice automáticamente
          </p>
          
          {/* Storage info */}
          {user && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg inline-block">
              <p className="text-sm text-muted-foreground">
                Almacenamiento usado: {((user.storageUsed / 1024 / 1024 / 1024) * 100).toFixed(1)}% 
                ({(user.storageUsed / 1024 / 1024).toFixed(1)} MB / {(user.storageLimit / 1024 / 1024 / 1024).toFixed(1)} GB)
              </p>
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {/* Upload progress */}
        {isUploading && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="font-medium">Subiendo documentos...</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {uploadProgress.toFixed(0)}% completado
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFiles.length > 0 ? (
                <div className="scale-in space-y-4">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {selectedFiles.length} archivo{selectedFiles.length > 1 ? 's' : ''} seleccionado{selectedFiles.length > 1 ? 's' : ''}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="border border-border rounded-lg p-3 bg-card">
                        {previewUrls[index] ? (
                          <img
                            src={previewUrls[index]}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                        ) : (
                          <div className="w-full h-32 bg-muted rounded flex items-center justify-center mb-2">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-xs text-destructive hover:underline mt-1"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 justify-center mt-4">
                    <button
                      onClick={() => {
                        setSelectedFiles([]);
                        setPreviewUrls([]);
                      }}
                      className="btn-secondary"
                      disabled={isUploading}
                    >
                      Limpiar todo
                    </button>
                    <button 
                      onClick={processDocuments} 
                      className="btn-hero"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Subiendo...
                        </>
                      ) : (
                        `Procesar ${selectedFiles.length} documento${selectedFiles.length > 1 ? 's' : ''}`
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadIcon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Arrastra archivos aquí
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    O selecciona archivos desde tu dispositivo
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-hero flex items-center gap-2"
                    >
                      <UploadIcon className="w-5 h-5" />
                      Subir archivo
                    </button>
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Hacer foto
                    </button>
                  </div>
                  
          <p className="text-sm text-muted-foreground mt-4">
            Todos los formatos de archivo (máx. 1GB)
          </p>
                </div>
              )}
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Tips Panel */}
          <div className="card-soft slide-in-right">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Consejos para mejores resultados</h3>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Usa buena luz</p>
                  <p className="text-muted-foreground">Evita sombras y asegúrate de que el texto sea legible</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Frame className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Enmarca bien el documento</p>
                  <p className="text-muted-foreground">Incluye todo el contenido y evita cortar texto importante</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Camera className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Evita reflejos</p>
                  <p className="text-muted-foreground">Inclina ligeramente el documento si hay brillos</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-light rounded-lg">
              <p className="text-sm text-primary font-medium">
                💡 ¿Sabías que puedes subir múltiples páginas del mismo documento?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;