import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, AlertTriangle } from "lucide-react";
import useParentalGuides from "@/hooks/useParentalGuides";
import { cn } from "@/lib/utils";

interface ParentalGuidesProps {
  movieId: number;
  className?: string;
}

const ParentalGuides = ({ movieId, className }: ParentalGuidesProps) => {
  const { data, isLoading, error } = useParentalGuides(movieId);

  if (error) {
    return null; // Fail silently for parental guides
  }

  const guides = data?.data?.parental_guides || [];

  if (!isLoading && guides.length === 0) {
    return null;
  }

  const getSeverityColor = (type: string) => {
    const lowSeverity = ["mild", "none", "brief"];
    const highSeverity = ["severe", "intense", "graphic"];

    if (lowSeverity.some((word) => type.toLowerCase().includes(word))) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    if (highSeverity.some((word) => type.toLowerCase().includes(word))) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  return (
    <Card className={cn("shadow-none border-none", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Parental Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-full border" />
                </div>
                <Skeleton className="h-12 w-full rounded" />
              </div>
            ))}
          </div>
        ) : guides.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No parental guidance information available for this movie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {guides.map((guide, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={getSeverityColor(guide.type)}
                  >
                    {guide.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {guide.parental_guide_text}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParentalGuides;
