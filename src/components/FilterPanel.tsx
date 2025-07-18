import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import type { FilterPanelProps, MovieFilters } from "@/types/movie";
import { GENRES, QUALITIES, SORT_OPTIONS } from "@/types/movie";
import { cn } from "@/lib/utils";

const FilterPanel = ({
  filters,
  onFiltersChange,
  isLoading,
}: FilterPanelProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.query_term || "");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFiltersChange({
        ...filters,
        query_term: searchTerm.trim() || undefined,
        page: 1,
      });
    },
    [filters, searchTerm, onFiltersChange]
  );

  const handleFilterChange = useCallback(
    (key: keyof MovieFilters, value: string | number | undefined) => {
      onFiltersChange({ ...filters, [key]: value, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    onFiltersChange({ page: 1, limit: 20 });
  }, [onFiltersChange]);

  const hasActiveFilters = Boolean(
    filters.query_term ||
      filters.genre ||
      filters.quality !== "all" ||
      filters.minimum_rating ||
      filters.sort_by !== "date_added"
  );

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                disabled={isLoading}
                className="text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? "Less" : "More"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Search
          </Button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Quality</label>
            <Select
              value={filters.quality || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  "quality",
                  value === "all" ? undefined : value
                )
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUALITIES.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality === "all" ? "All Qualities" : quality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Sort By</label>
            <Select
              value={filters.sort_by || "date_added"}
              onValueChange={(value) => handleFilterChange("sort_by", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Min Rating</label>
            <Select
              value={filters.minimum_rating?.toString() || "0"}
              onValueChange={(value) =>
                handleFilterChange(
                  "minimum_rating",
                  value === "0" ? undefined : Number(value)
                )
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating}+ Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Order</label>
            <Select
              value={filters.order_by || "desc"}
              onValueChange={(value) => handleFilterChange("order_by", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={cn("space-y-2", !isExpanded && "hidden")}>
          <label className="text-sm font-medium">Genre</label>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!filters.genre ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleFilterChange("genre", undefined)}
            >
              All Genres
            </Badge>
            {GENRES.map((genre) => (
              <Badge
                key={genre}
                variant={filters.genre === genre ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  handleFilterChange(
                    "genre",
                    filters.genre === genre ? undefined : genre
                  )
                }
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {filters.query_term && (
              <Badge variant="secondary">Search: {filters.query_term}</Badge>
            )}
            {filters.genre && (
              <Badge variant="secondary">Genre: {filters.genre}</Badge>
            )}
            {filters.quality && filters.quality !== "all" && (
              <Badge variant="secondary">Quality: {filters.quality}</Badge>
            )}
            {filters.minimum_rating && (
              <Badge variant="secondary">
                Rating: {filters.minimum_rating}+
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
