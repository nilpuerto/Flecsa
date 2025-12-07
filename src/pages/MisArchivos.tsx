import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { 
  Folder, FileText, Search, MoreVertical, Download, Share2, 
  Star, Trash2, Volume2, Edit, Copy, Move, FolderPlus, Upload,
  Image as ImageIcon, Video, Music, File
} from "lucide-react";
import { apiService } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import FloatingActionButton from "@/components/FloatingActionButton";

interface Document {
  id: number;
  filename: string;
  mime_type: string;
  byte_size: number;
  created_at: string;
  updated_at: string;
  tags?: string | null;
}

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  mime_type?: string;
  updated_at: string;
  byte_size?: number;
}

const MisArchivos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSidebarCollapsed } = useOutletContext<{ isSidebarCollapsed: boolean }>() || { isSidebarCollapsed: false };
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const formatStorage = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  useEffect(() => {
    fetchDocuments();
  }, [activeCategory]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getDocuments(1, 100, searchQuery);
      if (!response.error && response.data) {
        const docs = (response.data as any).documents || [];
        setDocuments(docs);
        
        // Organize by tags (folders)
        const tagsMap = new Map<string, Document[]>();
        docs.forEach((doc: Document) => {
          if (doc.tags) {
            const tagList = doc.tags.split(',').map(t => t.trim());
            tagList.forEach(tag => {
              if (!tagsMap.has(tag)) {
                tagsMap.set(tag, []);
              }
              tagsMap.get(tag)!.push(doc);
            });
          } else {
            if (!tagsMap.has('Sin etiqueta')) {
              tagsMap.set('Sin etiqueta', []);
            }
            tagsMap.get('Sin etiqueta')!.push(doc);
          }
        });

        // Create folder items from tags
        const folderItems: FolderItem[] = Array.from(tagsMap.entries()).map(([tag, docs]) => ({
          id: `folder-${tag}`,
          name: tag,
          type: 'folder' as const,
          updated_at: docs[0]?.updated_at || new Date().toISOString()
        }));

        // Filter by category
        let filteredDocs = docs;
        if (activeCategory !== 'all') {
          filteredDocs = docs.filter((doc: Document) => {
            if (activeCategory === 'images') return doc.mime_type?.startsWith('image/');
            if (activeCategory === 'documents') return doc.mime_type === 'application/pdf' || doc.mime_type?.includes('document');
            if (activeCategory === 'video') return doc.mime_type?.startsWith('video/');
            if (activeCategory === 'music') return doc.mime_type?.startsWith('audio/');
            return true;
          });
        }

        setFolders(folderItems);
        setDocuments(filteredDocs);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType?.startsWith('image/')) return ImageIcon;
    if (mimeType?.startsWith('video/')) return Video;
    if (mimeType?.startsWith('audio/')) return Music;
    if (mimeType === 'application/pdf') return FileText;
    return File;
  };

  const categories = [
    { id: 'all', name: 'Todos los archivos', icon: Folder },
    { id: 'images', name: 'Imágenes', icon: ImageIcon },
    { id: 'documents', name: 'Documentos', icon: FileText },
    { id: 'video', name: 'Vídeo', icon: Video },
    { id: 'music', name: 'Música', icon: Music },
    { id: 'others', name: 'Otros', icon: File }
  ];

  const actions = [
    { id: 'share', name: 'Compartir', icon: Share2 },
    { id: 'favorite', name: 'Añadir a favoritos', icon: Star },
    { id: 'download', name: 'Descargar', icon: Download },
    { id: 'voice', name: 'Leer en voz alta', icon: Volume2 },
    { id: 'rename', name: 'Renombrar', icon: Edit },
    { id: 'copy', name: 'Copiar', icon: Copy },
    { id: 'move', name: 'Mover', icon: Move },
  ];

  return (
    <div className="h-full flex bg-[#f8fbff] overflow-hidden">
      {/* Sidebar - Hidden when main sidebar is collapsed */}
      <aside className={`w-52 md:w-64 border-r border-primary/20 bg-[#f5f9ff] flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : ''}`}>
        <div className="flex-1 overflow-y-auto py-2 md:py-4">
          <nav className="space-y-1 px-2 md:px-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 mt-2 md:mt-4 pt-2 md:pt-4 px-2 md:px-3">
            <button className="w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Compartir</span>
            </button>
            <button className="w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Favoritos</span>
            </button>
            <button className="w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Papelera de reciclaje</span>
            </button>
          </div>
          
          {/* Storage Info */}
          {user && (
            <div className="border-t border-slate-200 mt-2 md:mt-4 pt-2 md:pt-4 px-2 md:px-3">
              <div className="px-2 md:px-3 py-1.5 md:py-2">
                <p className="text-[10px] md:text-xs text-slate-500 mb-1">Almacenamiento disponible</p>
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                  <span className="text-xs md:text-sm font-medium text-slate-900">
                    {formatStorage(user.storageUsed)}
                  </span>
                  <span className="text-[10px] md:text-xs text-slate-500">
                    de {formatStorage(user.storageLimit)}
                  </span>
                </div>
                <div className="w-full h-1 md:h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min((user.storageUsed / user.storageLimit) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Search Bar */}
        <div className="border-b border-primary/20 bg-[#eef5ff] px-3 md:px-6 py-2 md:py-4">
          <div className="relative">
            <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchDocuments()}
              placeholder="Buscar su documento"
              className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900 mb-1">
                {categories.find(c => c.id === activeCategory)?.name || 'Todos los archivos'}
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                {documents.length} {documents.length === 1 ? 'archivo' : 'archivos'}
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Subir archivo</span>
              </button>
              <button className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                <FolderPlus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Nueva carpeta</span>
              </button>
            </div>
          </div>

          {/* Files Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : documents.length > 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Nombre del archivo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Modificación de fecha/hora
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Tamaño
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {documents.map((doc) => {
                    const FileIcon = getFileIcon(doc.mime_type);
                    const isSelected = selectedItem === `file-${doc.id}`;
                    const isPDF = doc.mime_type === 'application/pdf';
                    
                    return (
                      <tr
                        key={doc.id}
                        onClick={() => navigate(`/app/document/${doc.id}`)}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                          isSelected ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <FileIcon className="w-5 h-5 text-primary" />
                            <span className="font-medium text-slate-900">{doc.filename}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {formatDate(doc.updated_at)}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {formatFileSize(doc.byte_size)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="relative inline-block">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(selectedItem === `file-${doc.id}` ? null : `file-${doc.id}`);
                              }}
                              className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 text-slate-600" />
                            </button>
                            
                            {selectedItem === `file-${doc.id}` && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                                <div className="py-1">
                                  {actions
                                    .filter(action => !(action.id === 'voice' && !isPDF))
                                    .map((action) => {
                                      const ActionIcon = action.icon;
                                      return (
                                        <button
                                          key={action.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: Implement actions
                                            setSelectedItem(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                          <ActionIcon className="w-4 h-4" />
                                          <span>{action.name}</span>
                                        </button>
                                      );
                                    })}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
              <Folder className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-600 mb-2">No hay archivos</p>
              <p className="text-sm text-slate-500">Sube tu primer documento usando el botón +</p>
            </div>
          )}
        </div>
      </main>

      <FloatingActionButton />
    </div>
  );
};

export default MisArchivos;
