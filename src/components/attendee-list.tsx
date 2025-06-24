import {
  useEffect,
  useState,
  useCallback,
  useRef,
  type ChangeEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Checkbox } from "./check-box";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";
import { TableBody } from "./table/table-body";
import { TableDivisor } from "./table/table-divisor";
import { Container } from "./table/container";
import { Span } from "./table/span";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

interface PaginationInfo {
  pageIndex: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  attendees: Attendee[];
  pagination: PaginationInfo;
}

export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Math.max(1, Number(url.searchParams.get("page")) || 1);
    }

    return 1;
  });

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    pageIndex: 0,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchDebounced, setSearchDebounced] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchAttendees = useCallback(async () => {
    if (attendees.length === 0 && !searchDebounced.trim()) {
      setLoading(true);
    } else {
      setIsSearching(true);
    }
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        pageIndex: (page - 1).toString(),
        limit: "10",
      });

      if (searchDebounced.trim()) {
        queryParams.set("query", searchDebounced.trim());
      }

      const response = await fetch(
        `http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch attendees: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      console.log("DADOS DA API:", data);
      console.log("ATTENDEES:", data.attendees?.length || 0, "participantes");
      console.log("PAGINAÇÃO:", data.pagination);

      setAttendees(data.attendees || []);
      setPagination(data.pagination);
      setSelectedItems(new Set());
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro desconhecido");
      console.error("Error fetching attendees:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [page, searchDebounced]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchDebounced(search);

      if (search !== searchDebounced) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, searchDebounced]);

  useEffect(() => {
    fetchAttendees();
  }, [fetchAttendees]);

  useEffect(() => {
    if (
      !loading &&
      !isSearching &&
      searchInputRef.current &&
      search.length > 0
    ) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          const inputLength = searchInputRef.current.value.length;
          searchInputRef.current.setSelectionRange(inputLength, inputLength);
        }
      }, 10);
    }
  }, [loading, isSearching, search.length]);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function setCurrentPage(newPage: number) {
    const url = new URL(window.location.toString());
    const clampedPage = Math.max(
      1,
      Math.min(newPage, pagination.totalPages || 1)
    );

    url.searchParams.set("page", String(clampedPage));
    window.history.pushState({}, "", url);
    setPage(clampedPage);
  }

  function goToNextPage() {
    if (page < (pagination.totalPages || 1)) {
      setCurrentPage(page + 1);
    }
  }

  function goToPreviousPage() {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(pagination.totalPages || 1);
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);

    if (checked) {
      attendees.forEach((attendee) => {
        newSelectedItems.add(attendee.id);
      });
    } else {
      attendees.forEach((attendee) => {
        newSelectedItems.delete(attendee.id);
      });
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (attendeeId: number, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);

    if (checked) {
      newSelectedItems.add(attendeeId);
    } else {
      newSelectedItems.delete(attendeeId);
    }

    setSelectedItems(newSelectedItems);
  };

  const currentPageSelectedCount = attendees.filter((attendee) =>
    selectedItems.has(attendee.id)
  ).length;

  const selectAll =
    currentPageSelectedCount === attendees.length && attendees.length > 0;
  const isIndeterminate =
    currentPageSelectedCount > 0 && currentPageSelectedCount < attendees.length;

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
            Participantes
          </h1>
        </div>
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Carregando participantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
            Participantes
          </h1>
        </div>
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">
            Erro ao carregar participantes: {error}
          </p>
          <button
            onClick={fetchAttendees}
            className="ml-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
          Participantes
        </h1>

        <div
          className="
          group flex items-center w-72
          px-3 py-2
          bg-background
          border border-gray-200         
          rounded-md
          shadow-sm
          transition
          focus-within:border-gray-300   
          focus-within:ring-1
          focus-within:ring-gray-200     
          focus-within:ring-offset-2
          focus-within:ring-offset-background
        "
        >
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600" />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            className="
            ml-2 flex-1
            bg-transparent
            border-none outline-none
            text-sm text-foreground
            placeholder:text-gray-400     
          "
            placeholder="Buscar participante..."
            onChange={onSearchInputChanged}
          />
          {isSearching && (
            <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          )}
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <Checkbox
                checked={selectAll}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <TableBody>
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <TableRow key={attendee.id} variant>
                <TableDivisor>
                  <Checkbox
                    checked={selectedItems.has(attendee.id)}
                    onChange={(checked) =>
                      handleSelectItem(attendee.id, checked)
                    }
                  />
                </TableDivisor>

                <TableDivisor>{attendee.id}</TableDivisor>

                <TableDivisor variant>
                  <Container>
                    <Span>{attendee.name}</Span>
                    <Span variant>{attendee.email}</Span>
                  </Container>
                </TableDivisor>

                <TableDivisor>
                  {dayjs(attendee.createdAt).fromNow()}
                </TableDivisor>
                <TableDivisor>
                  {attendee.checkedInAt ? (
                    dayjs(attendee.checkedInAt).fromNow()
                  ) : (
                    <span className="text-zinc-400">Não fez check-in</span>
                  )}
                </TableDivisor>
                <TableDivisor variant className="text-right">
                  <IconButton transparent>
                    <MoreHorizontal className="h-4 w-4 text-gray-900/30" />
                  </IconButton>
                </TableDivisor>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableDivisor colSpan={6} className="text-center py-8">
                <span className="text-gray-500">
                  {isSearching
                    ? "Buscando..."
                    : searchDebounced.trim()
                    ? `Nenhum participante encontrado para "${searchDebounced}"`
                    : "Nenhum participante encontrado"}
                </span>
              </TableDivisor>
            </TableRow>
          )}
        </TableBody>
        <tfoot>
          <tr>
            <TableDivisor className="text-sm text-gray-700" colSpan={3}>
              {(() => {
                const startItem = (page - 1) * pagination.limit + 1;
                const endItem = Math.min(
                  page * pagination.limit,
                  pagination.total
                );
                return `Mostrando ${startItem}-${endItem} de ${pagination.total} itens`;
              })()}{" "}
              {selectedItems.size > 0 && `(${selectedItems.size} selecionados)`}
            </TableDivisor>

            <TableDivisor className="text-gray-700 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {pagination.totalPages || 1}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="h-4 w-4 text-gray-900/30" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="h-4 w-4 text-gray-900/30" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page >= (pagination.totalPages || 1)}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-900/30" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page >= (pagination.totalPages || 1)}
                  >
                    <ChevronsRight className="h-4 w-4 text-gray-900/30" />
                  </IconButton>
                </div>
              </div>
            </TableDivisor>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
