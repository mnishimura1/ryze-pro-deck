output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.deck_bucket.bucket
}

output "s3_website_endpoint" {
  description = "S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.deck_bucket_website.website_endpoint
}

output "s3_website_url" {
  description = "S3 website URL"
  value       = "http://${aws_s3_bucket_website_configuration.deck_bucket_website.website_endpoint}"
}