#!/usr/bin/env python3
"""
Simple HTTP Server with correct MIME types for ES6 modules
"""
import http.server
import socketserver
import mimetypes

# Add correct MIME types for JavaScript modules
mimetypes.add_type('text/javascript', '.js')
mimetypes.add_type('text/javascript', '.mjs')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop")
    httpd.serve_forever()
