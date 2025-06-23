import { useEffect, useState, type ChangeEvent } from "react";
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
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch attendees");
        }
        return response.json();
      })
      .then((data) => {
        setAttendees(data.attendees || []);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching attendees:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const itemsPerPage = 10;

  const filteredAttendees = search
    ? attendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(search.toLowerCase()) ||
          attendee.email.toLowerCase().includes(search.toLowerCase())
      )
    : attendees;

  const totalPages = Math.ceil(filteredAttendees.length / itemsPerPage);

  const currentPageData = filteredAttendees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setPage(1);
  }

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);

    if (checked) {
      currentPageData.forEach((attendee) => {
        newSelectedItems.add(attendee.id);
      });
    } else {
      currentPageData.forEach((attendee) => {
        newSelectedItems.delete(attendee.id);
      });
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (attendeeId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);

    if (checked) {
      newSelectedItems.add(attendeeId);
    } else {
      newSelectedItems.delete(attendeeId);
    }

    setSelectedItems(newSelectedItems);
  };

  const currentPageSelectedCount = currentPageData.filter((attendee) =>
    selectedItems.has(attendee.id)
  ).length;

  const selectAll =
    currentPageSelectedCount === currentPageData.length &&
    currentPageData.length > 0;
  const isIndeterminate =
    currentPageSelectedCount > 0 &&
    currentPageSelectedCount < currentPageData.length;

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
          {currentPageData.map((attendee) => (
            <TableRow key={attendee.id} variant>
              <TableDivisor>
                <Checkbox
                  checked={selectedItems.has(attendee.id)}
                  onChange={(checked) => handleSelectItem(attendee.id, checked)}
                />
              </TableDivisor>

              <TableDivisor>{attendee.id}</TableDivisor>

              <TableDivisor variant>
                <Container>
                  <Span>{attendee.name}</Span>
                  <Span variant> {attendee.email}</Span>
                </Container>
              </TableDivisor>

              <TableDivisor>{dayjs(attendee.createdAt).fromNow()}</TableDivisor>
              <TableDivisor>
                {attendee.checkedInAt
                  ? dayjs(attendee.checkedInAt).fromNow()
                  : "-"}
              </TableDivisor>
              <TableDivisor variant className="text-right">
                <IconButton transparent>
                  <MoreHorizontal className="h-4 w-4 text-gray-900/30" />
                </IconButton>
              </TableDivisor>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <tr>
            <TableDivisor className="text-sm text-gray-700" colSpan={3}>
              Mostrando {currentPageData.length} de {filteredAttendees.length}{" "}
              itens{" "}
              {selectedItems.size > 0 && `(${selectedItems.size} selecionados)`}
            </TableDivisor>

            <TableDivisor className=" text-gray-700 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
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
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-900/30" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
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
